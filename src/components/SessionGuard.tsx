import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { logout } from '../store/slices/userSlice';

export const SessionGuard = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname === '/auth') {
      dispatch(logout());
      localStorage.removeItem('session');
    }
  }, [location.pathname, dispatch]);

  return null;
};
