import { createSlice } from '@reduxjs/toolkit';
import { basicInitialState } from './basic-state';
import { PayloadAction } from '@reduxjs/toolkit'
import { Movie, Movies } from '../../../../types/types';

export const basicSlice = createSlice({
  name: 'basic',
  initialState: basicInitialState,
  reducers: {
    setMovies(state, action: PayloadAction<Movies>) {
      state.movies = action.payload
    },
    setMovieCover(state, action: PayloadAction<Movie>) {
      state.movie_cover = action.payload
    },
    setFavoritesMovies(state, action: PayloadAction<Movies>) {
      state.favorites_movies = action.payload
    }
  }
});
