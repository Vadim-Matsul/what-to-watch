import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { isFetchFavoritesMovies_F, isFetchFavoritesMovies_P, isFetchFavoritesMovies_R } from './basic-types';
import { isHydrateAction } from '../../../../helpers/utils/utils';
import { Movie, Movies } from '../../../../types/movies';
import { basicInitialState } from './basic-state';


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
  },
  extraReducers: builder => {

    builder.addMatcher(isHydrateAction, (state, action) => {
      return !state.movies.length
        ? { ...action.payload.data.basic }  // HYDRATE ACTION из _app, заменяемый нулевое состояние
        : { ...state }    // HYDRATE ACTION со страницы, который не должен заменять уже существующие состояние, полученное HYDRATE ACTION из _app
    });

    builder.addMatcher(isFetchFavoritesMovies_F, (state, action) => { state.status = action.meta.requestStatus; })
    builder.addMatcher(isFetchFavoritesMovies_P, (state, action) => { state.status = action.meta.requestStatus });
    builder.addMatcher(isFetchFavoritesMovies_R, (state, action) => { state.status = action.meta.requestStatus });
  }
});


export const { setFavoritesMovies, setMovieCover, setMovies } = basicSlice.actions;
