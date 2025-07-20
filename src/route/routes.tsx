import { createBrowserRouter } from 'react-router-dom';

import App from '../components/App';
import Auth from '../pages/Auth';
import CreateFilms from '../pages/CreateFilms';
import FilmInfo from '../pages/FilmInfo';
import Home from '../pages/Home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'auth', element: <Auth /> },
      { path: 'dashboard', element: <Home /> },
      { path: 'create-film', element: <CreateFilms /> },
      { path: 'film-info/:id', element: <FilmInfo /> },
    ],
  },
]);
