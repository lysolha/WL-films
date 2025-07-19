import { useState } from 'react';
import FilmForm from '../components/FilmForm';
import ImportForm from '../components/ImportForm';
import Button from '../components/ui/Button';
import Dialog from '../components/ui/dialog';

const CreateFilms = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1>CreateFilms</h1>
        <Button onClick={() => setOpen(true)}>Import films</Button>
      </div>
      <FilmForm />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <ImportForm />
      </Dialog>
    </div>
  );
};

export default CreateFilms;
