import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import FilmForm from '../components/FilmForm';
import ImportForm from '../components/ImportForm';
import Button from '../components/ui/Button';
import Dialog from '../components/ui/dialog';
import { createFilm } from '../store/extraReducers/filmExtraReducer';
import type { AppDispatch, RootState } from '../store/store';
import type { FormFilm } from '../types/Film';
const CreateFilms = () => {
  const [open, setOpen] = useState(false);

  const { token } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const handleCreateFilm = async (film: FormFilm) => {
    if (!token) return;
    try {
      await dispatch(createFilm(film)).unwrap();
      // navigate('/');
      toast.success('Film created successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Create film</h1>
        <Button onClick={() => setOpen(true)}>Import films</Button>
      </div>
      <FilmForm onSubmit={handleCreateFilm} />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <ImportForm />
      </Dialog>
    </div>
  );
};

export default CreateFilms;
