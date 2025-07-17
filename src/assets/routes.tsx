import { createBrowserRouter, Navigate } from 'react-router-dom';

import Auth from '../pages/Auth';
import CreateFilms from '../pages/CreateFilms';
import FilmInfo from '../pages/FilmInfo';
import Home from '../pages/Home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/auth',
    element: <Auth />,
  },
  {
    path: '/create-film',
    element: <CreateFilms />,
  },
  {
    path: '/film-info',
    element: <FilmInfo />,
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
]);
