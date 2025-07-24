import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FilmForm from '../components/Forms/FilmForm';
import ImportForm from '../components/Forms/ImportForm';
import Button from '../components/ui/Button';
import Dialog from '../components/ui/dialog';
import withAuth from '../components/WithAuth';
import { handleApiError } from '../store/APIs/errorHandler';
import {
  createFilm,
  importFilms,
} from '../store/extraReducers/filmExtraReducer';
import type { AppDispatch, RootState } from '../store/store';
import type { FormFilm } from '../types/Film';

const CreateFilmsComponent = () => {
  const [open, setOpen] = useState(false);
  const [formKey, setFormKey] = useState(Date.now());
  const navigate = useNavigate();
  const { token } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleCreateFilm = async (film: FormFilm) => {
    if (!token) return;
    try {
      await dispatch(createFilm({ film, token })).unwrap();
      handleBack();
      toast.success('Film created successfully');
    } catch (error) {
      toast.error(`Film created failed: ${handleApiError(error)}`);
    }
  };

  const handleImportFilms = async (file: File | null) => {
    if (!token || !file) return;
    try {
      await dispatch(importFilms({ file, token })).unwrap();
      handleBack();
      toast.success('Films imported successfully');
    } catch (error) {
      toast.error(`Films imported failed: ${handleApiError(error)}`);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-3 justify-between items-center gap-2">
        <Button onClick={handleBack} className="col-span-1 col-start-1">
          Back
        </Button>
        <h1 className="text-2xl font-bold col-span-2 lg:col-start-1">
          Create film
        </h1>
        <div className="flex justify-end col-span-1 col-start-3 row-start-1">
          <Button onClick={() => setOpen(true)}>Import films</Button>
        </div>
      </div>
      <FilmForm onSubmit={handleCreateFilm} />
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          setFormKey(Date.now());
        }}
      >
        <ImportForm key={formKey} handleImportFilms={handleImportFilms} />
      </Dialog>
    </div>
  );
};

const CreateFilms = withAuth(CreateFilmsComponent);
export default CreateFilms;
