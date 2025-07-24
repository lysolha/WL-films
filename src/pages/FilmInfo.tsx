import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import FilmForm from '../components/Forms/FilmForm';
import Button from '../components/ui/Button';
import Confirmation from '../components/ui/Confirmation';
import Dialog from '../components/ui/dialog';
import DeleteIcon from '../components/ui/icons/DeleteIcon';
import PlayIcon from '../components/ui/icons/PlayIcon';
import { handleApiError } from '../store/APIs/errorHandler';
import {
  deleteFilm,
  getAllFilms,
  getFilmById,
  updateFilm,
} from '../store/extraReducers/filmExtraReducer';
import type { AppDispatch, RootState } from '../store/store';
import type { FormFilm } from '../types/Film';

type DialogType = 'edit' | 'delete' | null;

const FilmInfo = () => {
  const { id } = useParams();
  const { token } = useSelector((state: RootState) => state.user);
  const { film } = useSelector((state: RootState) => state.film);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [dialogType, setDialogType] = useState<DialogType>(null);

  const showFilmById = async () => {
    if (token && id) {
      try {
        await dispatch(getFilmById({ id, token })).unwrap();
      } catch (error) {
        toast.error(`Film not found: ${handleApiError(error)}`);
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
      toast.error(`Film deleted failed: ${handleApiError(error)}`);
    }
  };

  const handleUpdateFilm = async (film: FormFilm) => {
    if (!token || !id) return;
    try {
      await dispatch(updateFilm({ film, token, id })).unwrap();
      setOpen(false);
      setDialogType(null);
      showFilmById();
      toast.success('Film updated successfully');
    } catch (error) {
      toast.error(`Film updated failed: ${handleApiError(error)}`);
    }
  };

  const handleOpenEditDialog = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setDialogType('edit');
    setOpen(true);
  };

  const handleOpenDeleteDialog = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setDialogType('delete');
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setDialogType(null);
  };

  const handleConfirmDelete = () => {
    if (film?.id) {
      handleDeleteFilm(film.id);
    }
    handleCloseDialog();
  };

  const displayDialogContent = () => {
    switch (dialogType) {
      case 'edit':
        return film ? (
          <FilmForm onSubmit={handleUpdateFilm} film={film} />
        ) : null;
      case 'delete':
        return (
          <Confirmation
            onConfirm={handleConfirmDelete}
            onCancel={handleCloseDialog}
            content="Are you sure you want to delete this film?"
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    showFilmById();
  }, []);

  return (
    <>
      <div className="flex gap-2 justify-between">
        <Button onClick={() => navigate('/dashboard')}>Back</Button>
        <div className="flex gap-2">
          <Button onClick={handleOpenEditDialog}>Edit</Button>
          <Button onClick={handleOpenDeleteDialog}>
            <DeleteIcon />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-10">
        <h1 className="text-3xl font-bold text-center font-header uppercase">
          {film?.title}
        </h1>
        <h2 className="text-lg">
          <strong>ID:</strong> {film?.id}
        </h2>
        <p className="text-lg">
          <strong>YEAR:</strong> {film?.year}
        </p>
        <p className="text-lg">
          <strong>FORMAT:</strong> {film?.format}
        </p>
        <h2 className="text-lg">
          <strong>ACTORS:</strong>
        </h2>
        <ul className="list-disc list-inside ml-4">
          {film?.actors.map((actor) => (
            <li key={actor.id}>{actor.name}</li>
          ))}
        </ul>
        <div className="flex justify-center items-center py-10 px-4 border border-cream rounded-md mt-10">
          <PlayIcon />
        </div>

        {open && (
          <Dialog open={open} onClose={handleCloseDialog}>
            {displayDialogContent()}
          </Dialog>
        )}
      </div>
    </>
  );
};

export default FilmInfo;
