import type { FormFilm } from '../../types/Film';

export const getFilmById = async (id: string, token: string) => {
  const response = await fetch(`http://localhost:8000/api/v1/movies/${id}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const getAllFilms = async (token: string) => {
  const response = await fetch('http://localhost:8000/api/v1/movies', {
    headers: {
      Authorization: `${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const createFilm = async (film: FormFilm, token: string) => {
  const response = await fetch('http://localhost:8000/api/v1/movies', {
    method: 'POST',
    body: JSON.stringify(film),
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};

export const updateFilm = async (film: FormFilm, token: string, id: string) => {
  const response = await fetch(`http://localhost:8000/api/v1/movies/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(film),
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};

export const deleteFilm = async (id: string, token: string) => {
  const response = await fetch(`http://localhost:8000/api/v1/movies/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `${token}`,
    },
  });
  const data = await response.json();
  console.log('data', data);
  return data;
};

export const importFilms = async (file: File, token: string) => {
  if (!file) return;

  const formData = new FormData();
  formData.append('movies', file);

  const response = await fetch('http://localhost:8000/api/v1/movies/import', {
    method: 'POST',
    headers: {
      Authorization: `${token}`,
    },
    body: formData,
  });

  const data = await response.json();
  return data;
};
