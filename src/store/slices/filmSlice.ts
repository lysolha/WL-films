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
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

const initialState: FilmState = {
  allFilms: [],
  film: null,
  isLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 0,
  totalItems: 0,
  itemsPerPage: 9,
};

const filmSlice = createSlice({
  name: 'film',
  initialState,
  reducers: {
    setAllFilms: (state, action) => {
      state.allFilms = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 1;
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
        state.film = (action.payload as { data: Film }).data;
      })
      .addCase(getAllFilms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllFilms.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(getAllFilms.fulfilled, (state, action) => {
        state.allFilms = (action.payload as { data: Film[] }).data;
        state.totalItems = (
          action.payload as { meta: { total: number } }
        ).meta.total;
        state.totalPages = Math.ceil(state.totalItems / state.itemsPerPage);
        state.isLoading = false;

        if (state.totalPages < state.currentPage) {
          state.currentPage = 1;
        }
      })
      .addCase(createFilm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createFilm.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(createFilm.fulfilled, (state, action) => {
        state.allFilms.push(action.payload as Film);
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
          (film) => film.id !== (action.payload as Film).id
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
          film.id === (action.payload as Film).id ? action.payload : film
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
        console.log('importFilms.fulfilled', action);
        state.allFilms = (action.payload as { data: Film[] }).data;
        state.isLoading = false;
      });
  },
});

export const { setAllFilms, setCurrentPage, setItemsPerPage } =
  filmSlice.actions;
export default filmSlice.reducer;
