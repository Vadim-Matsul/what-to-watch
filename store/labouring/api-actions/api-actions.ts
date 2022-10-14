import { Movie, Movies } from '../../../types/movies';
import { ACTIONS } from '../actions/actions';
import { AsyncThunkResult } from '../../store.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { API_NAMES, HTTP } from '../../../helpers/const/const';
import { setMovieCover } from '../../reducers/data-reducer/basic-slice/basic-slice';

export const API_ACTIONS = {

  fetchMovies: createAsyncThunk<void, void, AsyncThunkResult>(
    'basic/fetchMovies',
    async (_, { dispatch, extra }) => {
      const { data } = await extra.get<Movies>(HTTP.MOVIES);
      dispatch(ACTIONS.setMovies(data))
      dispatch(setMovieCover(data[data.length - 1]));
    }),


  fetchCurrentMovie: createAsyncThunk<any, string, AsyncThunkResult>(
    API_NAMES.fetchCurrentMovie,
    async (id, { dispatch, extra, rejectWithValue }) => {
      try {
        const { data } = await extra.get<Movie>(HTTP.CURRENT_MOVIE.replace(/id/g, id));
        dispatch(ACTIONS.setCurrentMovie(data));
      } catch (err) {
        return rejectWithValue('')
      }
    }),



}


