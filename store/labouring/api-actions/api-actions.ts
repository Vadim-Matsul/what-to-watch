import { Movie, Movies } from '../../../types/movies';
import { ACTIONS } from '../actions/actions';
import { AsyncThunkResult } from '../../store.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { HTTP } from '../../../helpers/const/const';



export const API_ACTIONS = {

  fetchMovies: createAsyncThunk<void, void, AsyncThunkResult>(
    'basic/fetchMovies',
    async (_, { dispatch, extra }) => {
      const { data } = await extra.get<Movies>(HTTP.MOVIES);
      dispatch(ACTIONS.setMovies(data))
    }),

  fetchCurrentMovie: createAsyncThunk<void, string, AsyncThunkResult>(
    'current/fetchCurrentMovie',
    async (id, { dispatch, extra }) => {
      const { data } = await extra.get<Movie>(HTTP.CURRENT_MOVIE.replace(/id/g, id))
      dispatch(ACTIONS.setCurrentMovie(data))
    })

}


