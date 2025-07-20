import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FilmList from '../components/Film/List';
import SearchForm from '../components/SearchForm';
import Button from '../components/ui/Button';
import { logout } from '../store/slices/userSlice';
import type { AppDispatch, RootState } from '../store/store';

const Home = () => {
  const { token } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('session');
    navigate('/auth');
  };

  useEffect(() => {
    if (!token) handleLogout();
  }, []);

  return (
    <div>
      <div className="flex justify-between gap-2">
        <Button onClick={handleLogout}>Logout</Button>
        <Button onClick={() => navigate('/create-film')}>Create film</Button>
      </div>
      <SearchForm />
      <FilmList />
    </div>
  );
};

export default Home;
