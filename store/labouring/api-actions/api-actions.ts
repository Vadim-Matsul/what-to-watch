import { Movie, Movies } from '../../../types/movies';
import { ACTIONS } from '../actions/actions';
import { AsyncThunkResult } from '../../store.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { API_NAMES, HTTP } from '../../../helpers/const/const';
import { setMovieCover } from '../../reducers/data-reducer/basic-slice/basic-slice';
import { Reviews } from '../../../types/reviews';

export const API_ACTIONS = {

  fetchMovies: createAsyncThunk<void, void, AsyncThunkResult>(
    API_NAMES.fetchMovies,
    async (_, { dispatch, extra }) => {
      const { data } = await extra.get<Movies>(HTTP.MOVIES);
      dispatch(ACTIONS.setMovies(data))
      dispatch(setMovieCover(data[data.length - 1]));
    }),


  fetchCurrentMovie: createAsyncThunk<any, string, AsyncThunkResult>(
    API_NAMES.fetchCurrentMovie,
    async (id, { dispatch, extra, rejectWithValue }) => {
      try {
        const { data: movie } = await extra.get<Movie>(HTTP.CURRENT_MOVIE.replace(/id/g, id));
        const { data: reviews } = await extra.get<Reviews>(HTTP.CURRENT_REVIEWS_MOVIE.replace(/id/g, id));
        dispatch(ACTIONS.setCurrentMovieReviews(reviews));
        dispatch(ACTIONS.setCurrentMovie(movie));
      } catch (err) {
        return rejectWithValue('')
      }
    }),

}


