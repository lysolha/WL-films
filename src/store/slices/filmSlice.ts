import { createSlice } from '@reduxjs/toolkit';
import type { Film } from '../../types/Film';
import {
  createFilm,
  deleteFilm,
  getAllFilms,
  getFilmById,
  importFilms,
  updateFilm,
} from '../extraReducers/filmExtraReducer';

interface FilmState {
  allFilms: Film[];
  film: Film | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: FilmState = {
  allFilms: [],
  film: null,
  isLoading: false,
  error: null,
};

const filmSlice = createSlice({
  name: 'film',
  initialState,
  reducers: {
    setAllFilms: (state, action) => {
      state.allFilms = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFilmById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFilmById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(getFilmById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.film = action.payload;
      })
      .addCase(getAllFilms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllFilms.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(getAllFilms.fulfilled, (state, action) => {
        console.log('action.payload', action.payload);
        state.allFilms = action.payload;
        state.isLoading = false;
      })
      .addCase(createFilm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createFilm.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(createFilm.fulfilled, (state, action) => {
        state.allFilms.push(action.payload);
        state.isLoading = false;
      })
      .addCase(deleteFilm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFilm.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(deleteFilm.fulfilled, (state, action) => {
        state.allFilms = state.allFilms.filter(
          (film) => film.id !== action.payload.id
        );
        state.isLoading = false;
      })
      .addCase(updateFilm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFilm.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(updateFilm.fulfilled, (state, action) => {
        state.allFilms = state.allFilms.map((film) =>
          film.id === action.payload.id ? action.payload : film
        );
        state.isLoading = false;
      })
      .addCase(importFilms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(importFilms.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(importFilms.fulfilled, (state, action) => {
        state.allFilms = action.payload;
        state.isLoading = false;
      });
  },
});

export const { setAllFilms } = filmSlice.actions;
export default filmSlice.reducer;
