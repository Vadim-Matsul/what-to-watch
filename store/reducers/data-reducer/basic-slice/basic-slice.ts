import { createSlice } from '@reduxjs/toolkit';
import { basicInitialState } from './basic-state';
import { PayloadAction } from '@reduxjs/toolkit'
import { Movie, Movies } from '../../../../types/movies';
import { isHydrateAction } from '../../../../helpers/utils/utils';


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
    builder.addMatcher(isHydrateAction, (state, action) => ({
      ...state,
      ...action.payload.data.basic
    })
    )
  }
});

export const { setFavoritesMovies, setMovieCover, setMovies } = basicSlice.actions;
