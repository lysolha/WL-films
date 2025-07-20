import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Film, FilmForm } from '../../types/Film';
import * as FilmAPI from '../APIs/filmAPI';

export const getFilmById = createAsyncThunk(
  'film/getFilmById',
  async ({ id, token }: { id: string; token: string }, thunkAPI) => {
    const response = await FilmAPI.getFilmById(id, token);

    if (response.status === 0) {
      return thunkAPI.rejectWithValue(response.error);
    }

    return response.data;
  }
);

export const createFilm = createAsyncThunk(
  'film/createFilm',
  async (film: FilmForm) => {
    const response = await fetch('http://localhost:8000/api/v1/movies', {
      method: 'POST',
      body: JSON.stringify(film),
    });
    const data = await response.json();
    return data.data;
  }
);

export const deleteFilm = createAsyncThunk(
  'film/deleteFilm',
  async (id: string) => {
    const response = await fetch(`http://localhost:8000/api/v1/movies/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data.data;
  }
);

export const updateFilm = createAsyncThunk(
  'film/updateFilm',
  async (film: Film) => {
    const response = await fetch(
      `http://localhost:8000/api/v1/movies/${film.id}`,
      {
        method: 'PATCH',
        body: JSON.stringify(film),
      }
    );
    const data = await response.json();
    return data.data;
  }
);

export const getAllFilms = createAsyncThunk(
  'film/getAllFilms',
  async (token: string, thunkAPI) => {
    const response = await FilmAPI.getAllFilms(token);

    if (response.status === 0) {
      return thunkAPI.rejectWithValue(response.error);
    }

    return response.data;
  }
);

export const importFilms = createAsyncThunk('film/importFilms', async () => {
  const response = await fetch('http://localhost:8000/api/v1/movies/import');
  const data = await response.json();
  return data.data;
});
