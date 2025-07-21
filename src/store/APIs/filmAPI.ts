import type { FormFilm } from '../../types/Film';

const API_URL = import.meta.env.VITE_API_URL;

export const getFilmById = async (id: string, token: string) => {
  const response = await fetch(`${API_URL}/movies/${id}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const getAllFilms = async (
  token: string,
  search?: string,
  sort?: string,
  order?: string,
  limit?: number,
  offset?: number
) => {
  const queryParams = new URLSearchParams();

  if (search) {
    queryParams.append('search', search);
  }

  if (sort) {
    queryParams.append('sort', sort);
  }

  if (order) {
    queryParams.append('order', order);
  }

  if (limit) {
    queryParams.append('limit', limit.toString());
  }

  if (offset) {
    queryParams.append('offset', offset.toString());
  }

  const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
  console.log('query', query);
  const response = await fetch(`${API_URL}/movies${query}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  const data = await response.json();
  console.log('all films', data);
  return data;
};

export const createFilm = async (film: FormFilm, token: string) => {
  const response = await fetch(`${API_URL}/movies`, {
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
  const response = await fetch(`${API_URL}/movies/${id}`, {
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
  const response = await fetch(`${API_URL}/movies/${id}`, {
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

  const response = await fetch(`${API_URL}/movies/import`, {
    method: 'POST',
    headers: {
      Authorization: `${token}`,
    },
    body: formData,
  });

  const data = await response.json();
  return data;
};
