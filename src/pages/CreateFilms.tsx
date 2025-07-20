import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FilmForm from '../components/Forms/FilmForm';
import ImportForm from '../components/Forms/ImportForm';
import Button from '../components/ui/Button';
import Dialog from '../components/ui/dialog';
import {
  createFilm,
  importFilms,
} from '../store/extraReducers/filmExtraReducer';
import type { AppDispatch, RootState } from '../store/store';
import type { FormFilm } from '../types/Film';

const CreateFilms = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { token } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleCreateFilm = async (film: FormFilm) => {
    if (!token) return;
    try {
      await dispatch(createFilm({ film, token }));
      handleBack();
      toast.success('Film created successfully');
    } catch (error) {
      toast.error(`Film created failed: ${error}`);
    }
  };

  const handleImportFilms = async (file: File | null) => {
    if (!token || !file) return;
    try {
      await dispatch(importFilms({ file, token }));
      handleBack();
      toast.success('Films imported successfully');
    } catch (error) {
      toast.error(`Films imported failed: ${error}`);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <Button onClick={handleBack}>Back</Button>
        <h1 className="text-2xl font-bold">Create film</h1>
        <Button onClick={() => setOpen(true)}>Import films</Button>
      </div>
      <FilmForm onSubmit={handleCreateFilm} />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <ImportForm handleImportFilms={handleImportFilms} />
      </Dialog>
    </div>
  );
};

export default CreateFilms;
