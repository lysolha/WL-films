import { createAsyncThunk } from '@reduxjs/toolkit';
import type { FormFilm } from '../../types/Film';
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
  async ({ film, token }: { film: FormFilm; token: string }, thunkAPI) => {
    const response = await FilmAPI.createFilm(film, token);

    if (response.status === 0) {
      return thunkAPI.rejectWithValue(response.error);
    }

    return response.data;
  }
);

export const deleteFilm = createAsyncThunk(
  'film/deleteFilm',
  async ({ id, token }: { id: string; token: string }, thunkAPI) => {
    const response = await FilmAPI.deleteFilm(id, token);

    if (response.status === 0) {
      return thunkAPI.rejectWithValue(response.error);
    }

    return response;
  }
);

export const updateFilm = createAsyncThunk(
  'film/updateFilm',
  async (
    { film, token, id }: { film: FormFilm; token: string; id: string },
    thunkAPI
  ) => {
    const response = await FilmAPI.updateFilm(film, token, id);

    if (response.status === 0) {
      return thunkAPI.rejectWithValue(response.error);
    }

    return response.data;
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

export const importFilms = createAsyncThunk(
  'film/importFilms',
  async ({ file, token }: { file: File; token: string }, thunkAPI) => {
    const response = await FilmAPI.importFilms(file, token);

    if (response.status === 0) {
      return thunkAPI.rejectWithValue(response.error);
    }

    return response.data;
  }
);
