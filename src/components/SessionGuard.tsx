import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/userSlice';

export const SessionGuard = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/auth');
    }
    if (location.pathname === '/auth') {
      dispatch(logout());
      localStorage.removeItem('session');
    }
  }, [location.pathname, dispatch]);

  return null;
};
