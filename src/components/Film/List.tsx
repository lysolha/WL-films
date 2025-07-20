import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  deleteFilm,
  getAllFilms,
} from '../../store/extraReducers/filmExtraReducer';
import type { AppDispatch, RootState } from '../../store/store';
import ListSkeleton from '../skeletons/ListSkeleton';
import Button from '../ui/Button';
import FilmCard from './FilmCard';

const FilmList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { allFilms, isLoading } = useSelector((state: RootState) => state.film);
  const { token } = useSelector((state: RootState) => state.user);

  const getList = async () => {
    if (!token) return;
    try {
      await dispatch(getAllFilms(token)).unwrap();
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
      dispatch(getAllFilms(token));
      toast.success('All films deleted successfully');
    } catch (error) {
      toast.error(`All films deleted failed: ${error}`);
    }
  };

  useEffect(() => {
    if (!token || allFilms.length > 0) return;
    getList();
  }, []);

  console.log('allFilms', allFilms);
  console.log('isLoading', isLoading);

  if (isLoading) return <ListSkeleton />;

  return (
    <div className="flex flex-col gap-2">
      <Button onClick={handleDeleteAllFilms}>Delete all films</Button>
      <div className="grid grid-cols-3 gap-2">
        {allFilms && allFilms.length > 0 ? (
          allFilms.map((film) => <FilmCard key={film.id} film={film} />)
        ) : (
          <div className="text-center text-gray-500">No films found</div>
        )}
      </div>
    </div>
  );
};

export default FilmList;
