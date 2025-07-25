import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  deleteFilm,
  getAllFilms,
} from '../store/extraReducers/filmExtraReducer';
import { setCurrentPage, setItemsPerPage } from '../store/slices/filmSlice';
import { logout } from '../store/slices/userSlice';
import type { AppDispatch, RootState } from '../store/store';

import { toast } from 'react-toastify';

import FilmList from '../components/Film/List';
import Filter from '../components/Filter';
import SearchForm from '../components/Forms/SearchForm';
import withAuth from '../components/WithAuth';
import Button from '../components/ui/Button';
import Confirmation from '../components/ui/Confirmation';
import Pagination from '../components/ui/Pagination';
import Dialog from '../components/ui/dialog';
import { handleApiError } from '../store/APIs/errorHandler';
import type { Film } from '../types/Film';
import type { errorResponse } from '../types/requestResults';

interface SearchContextType {
  search: string;
  setSearch: (search: string) => void;
  sort: string;
  setSort: (sort: string) => void;
  order: string;
  setOrder: (order: string) => void;
}
export const SearchContext = createContext<SearchContextType | undefined>(
  undefined
);

const HomeComponent = () => {
  const { token } = useSelector((state: RootState) => state.user);
  const {
    allFilms,
    requestState,
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
  } = useSelector((state: RootState) => state.film);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');

  const [search, setSearch] = useState<string>('');
  const [sort, setSort] = useState<string>('');
  const [order, setOrder] = useState<string>('');

  const emptyList = useMemo(() => {
    return (
      allFilms.length === 0 &&
      requestState !== 'idle' &&
      requestState !== 'loading'
    );
  }, [allFilms, requestState]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    localStorage.removeItem('session');
    navigate('/auth');
  }, [dispatch, navigate]);

  const getList = useCallback(
    async ({
      page = 1,
      querySearch = search,
      querySort = sort,
      queryOrder = order,
    }: {
      page?: number;
      querySearch?: string;
      querySort?: string;
      queryOrder?: string;
    }) => {
      if (!token) return;
      try {
        const offset = (page - 1) * itemsPerPage;
        await dispatch(
          getAllFilms({
            token,
            search: querySearch,
            sort: querySort,
            order: queryOrder,
            limit: itemsPerPage,
            offset,
          })
        ).unwrap();
      } catch (error: unknown) {
        const errorResponse = error as errorResponse;
        if (errorResponse?.error?.code === 'WRONG_TOKEN') {
          handleLogout();
          toast.error('Your session is expired, please login again');
          return;
        }
        toast.error(handleApiError(error));
      }
    },
    [dispatch, itemsPerPage, order, search, sort, token, handleLogout]
  );

  const handleDeleteAllFilms = async () => {
    if (!token) return;
    try {
      const response = (await dispatch(getAllFilms({ token })).unwrap()) as {
        data: Film[];
      };
      const films = response.data;
      await Promise.all(
        films.map((film: Film) =>
          dispatch(deleteFilm({ id: film.id, token })).unwrap()
        )
      );
      toast.success('All films deleted successfully');
      getList({});
    } catch (error) {
      toast.error(`All films deleted failed: ${handleApiError(error)}`);
    }
  };

  const handlePageChange = useCallback(
    (page: number) => {
      dispatch(setCurrentPage(page));
      getList({ page });
    },
    [dispatch, getList]
  );

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    dispatch(setItemsPerPage(newItemsPerPage));
  };

  const showConfirmation = (content: string) => {
    setOpen(true);
    setContent(content);
  };

  const handleResetQueries = () => {
    setSearch('');
    setSort('');
    setOrder('');
  };

  useEffect(() => {
    getList({});
  }, [getList, handleLogout, token]);

  return (
    <div>
      <div className="flex justify-between gap-2">
        <Button onClick={handleLogout}>Logout</Button>
        <div className="flex gap-2">
          <Button
            onClick={() => showConfirmation('Delete all films?')}
            disabled={allFilms.length === 0}
          >
            Delete all films
          </Button>
          <Button onClick={() => navigate('/create-film')}>Create film</Button>
        </div>
      </div>
      <SearchContext.Provider
        value={{ search, setSearch, sort, setSort, order, setOrder }}
      >
        <SearchForm />
        <div className="flex gap-2 justify-between">
          <Filter />
          <Button onClick={handleResetQueries}>Reset queries</Button>
        </div>
      </SearchContext.Provider>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
      {emptyList && (
        <div className="text-center w-full text-cream text-2xl font-bold  p-4 col-span-3 underline underline-offset-4">
          No films found
        </div>
      )}
      {allFilms.length > 0 && (
        <FilmList allFilms={allFilms} isLoading={requestState === 'loading'} />
      )}

      <Dialog open={open} onClose={() => setOpen(false)}>
        <Confirmation
          onConfirm={handleDeleteAllFilms}
          onCancel={() => setOpen(false)}
          content={content}
        />
      </Dialog>
    </div>
  );
};

const Home = withAuth(HomeComponent);
export default Home;
