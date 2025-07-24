import { createAsyncThunk } from '@reduxjs/toolkit';
import type { FormFilm } from '../../types/Film';
import { responseHandler } from '../../utils/responseHandler';
import * as FilmAPI from '../APIs/filmAPI';

export const getFilmById = createAsyncThunk(
  'film/getFilmById',
  async ({ id, token }: { id: string; token: string }, thunkAPI) => {
    const response = await FilmAPI.getFilmById(id, token);

    return responseHandler(response, thunkAPI);
  }
);

export const createFilm = createAsyncThunk(
  'film/createFilm',
  async ({ film, token }: { film: FormFilm; token: string }, thunkAPI) => {
    const response = await FilmAPI.createFilm(film, token);

    return responseHandler(response, thunkAPI);
  }
);

export const deleteFilm = createAsyncThunk(
  'film/deleteFilm',
  async ({ id, token }: { id: string; token: string }, thunkAPI) => {
    const response = await FilmAPI.deleteFilm(id, token);

    return responseHandler(response, thunkAPI);
  }
);

export const updateFilm = createAsyncThunk(
  'film/updateFilm',
  async (
    { film, token, id }: { film: FormFilm; token: string; id: string },
    thunkAPI
  ) => {
    const response = await FilmAPI.updateFilm(film, token, id);

    return responseHandler(response, thunkAPI);
  }
);

export const getAllFilms = createAsyncThunk(
  'film/getAllFilms',
  async (
    {
      token,
      search,
      sort,
      order,
      limit,
      offset,
    }: {
      token: string;
      search?: string;
      sort?: string;
      order?: string;
      limit?: number;
      offset?: number;
    },
    thunkAPI
  ) => {
    const response = await FilmAPI.getAllFilms(
      token,
      search || '',
      sort || '',
      order || '',
      limit,
      offset
    );

    return responseHandler(response, thunkAPI);
  }
);

export const importFilms = createAsyncThunk(
  'film/importFilms',
  async ({ file, token }: { file: File; token: string }, thunkAPI) => {
    const response = await FilmAPI.importFilms(file, token);

    return responseHandler(response, thunkAPI);
  }
);
