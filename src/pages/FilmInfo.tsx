import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import FilmForm from '../components/Forms/FilmForm';
import Button from '../components/ui/Button';
import Dialog from '../components/ui/dialog';
import {
  deleteFilm,
  getAllFilms,
  getFilmById,
  updateFilm,
} from '../store/extraReducers/filmExtraReducer';
import type { AppDispatch, RootState } from '../store/store';
import type { FormFilm } from '../types/Film';

const FilmInfo = () => {
  const { id } = useParams();
  const { token } = useSelector((state: RootState) => state.user);
  const { film } = useSelector((state: RootState) => state.film);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const showFilmById = async () => {
    if (token && id) {
      try {
        const response = await dispatch(getFilmById({ id, token })).unwrap();
        console.log(response);
      } catch (error) {
        console.error(error);
        navigate('/dashboard');
      }
    } else {
      navigate('/auth');
    }
  };

  const handleDeleteFilm = async (id: string) => {
    if (!token || !id) return;
    try {
      await dispatch(deleteFilm({ id, token })).unwrap();
      navigate('/dashboard');
      dispatch(getAllFilms({ token }));
      toast.success('Film deleted successfully');
    } catch (error) {
      toast.error(`Film deleted failed: ${error}`);
    }
  };

  const handleUpdateFilm = async (film: FormFilm) => {
    if (!token || !id) return;
    try {
      await dispatch(updateFilm({ film, token, id })).unwrap();
      setOpen(false);
      showFilmById();
      toast.success('Film updated successfully');
    } catch (error) {
      toast.error(`Film updated failed: ${error}`);
    }
  };

  useEffect(() => {
    showFilmById();
  }, []);

  return (
    <div>
      <Button onClick={() => navigate('/dashboard')}>Back</Button>
      <Button onClick={() => setOpen(true)}>Edit</Button>
      <Button onClick={() => handleDeleteFilm(film?.id || '')}>Delete</Button>
      <h1>{film?.title}</h1>
      <p>{film?.year}</p>
      <p>{film?.format}</p>
      <ul>
        {film?.actors.map((actor) => (
          <li key={actor.id}>{actor.name}</li>
        ))}
      </ul>

      {film && open && (
        <Dialog open={open} onClose={() => setOpen(false)}>
          <FilmForm onSubmit={handleUpdateFilm} film={film} />
        </Dialog>
      )}
    </div>
  );
};

export default FilmInfo;
