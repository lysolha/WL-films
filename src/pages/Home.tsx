import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FilmList from '../components/Film/List';
import SearchForm from '../components/SearchForm';
import Button from '../components/ui/Button';
import Pagination from '../components/ui/Pagination';
import {
  deleteFilm,
  getAllFilms,
} from '../store/extraReducers/filmExtraReducer';
import { setCurrentPage, setItemsPerPage } from '../store/slices/filmSlice';
import { logout } from '../store/slices/userSlice';
import type { AppDispatch, RootState } from '../store/store';

const Home = () => {
  const { token } = useSelector((state: RootState) => state.user);
  const {
    allFilms,
    isLoading,
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
  } = useSelector((state: RootState) => state.film);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('session');
    navigate('/auth');
  };

  const getList = async (
    page = currentPage,
    search = '',
    sort = '',
    order = ''
  ) => {
    if (!token) return;
    try {
      const offset = (page - 1) * itemsPerPage;
      await dispatch(
        getAllFilms({
          token,
          search,
          sort,
          order,
          limit: itemsPerPage,
          offset,
        })
      ).unwrap();
    } catch (error) {
      toast.error((error as { code?: string }).code || 'Failed to get films');
    }
  };

  const handleDeleteAllFilms = async () => {
    if (!token) return;
    try {
      for (const film of allFilms) {
        await dispatch(deleteFilm({ id: film.id, token })).unwrap();
      }
      getList(1); // Reset to first page after deleting all
      toast.success('All films deleted successfully');
    } catch (error) {
      toast.error(`All films deleted failed: ${error}`);
    }
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    getList(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    dispatch(setItemsPerPage(newItemsPerPage));
    getList(1); // Reset to first page when changing items per page
  };

  useEffect(() => {
    if (!token) {
      handleLogout();
    } else {
      getList();
    }
  }, []);

  return (
    <div>
      <div className="flex justify-between gap-2 bg-sky-950">
        <Button onClick={handleDeleteAllFilms}>Delete all films</Button>
        <Button onClick={handleLogout}>Logout</Button>
        <Button onClick={() => navigate('/create-film')}>Create film</Button>
      </div>
      <SearchForm onSearch={getList} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
      <FilmList allFilms={allFilms} isLoading={isLoading} />
    </div>
  );
};

export default Home;
