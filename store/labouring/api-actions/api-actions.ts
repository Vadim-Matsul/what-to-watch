import { Movie, Movies } from '../../../types/movies';
import { ACTIONS } from '../actions/actions';
import { AsyncThunkResult } from '../../store.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { HTTP } from '../../../helpers/const/const';
import { setMovieCover } from '../../reducers/data-reducer/basic-slice/basic-slice';
import { FulfilledActionFromAsyncThunk, RejectedWithValueActionFromAsyncThunk } from '@reduxjs/toolkit/dist/matchers';



export const API_ACTIONS = {

  fetchMovies: createAsyncThunk<void, void, AsyncThunkResult>(
    'basic/fetchMovies',
    async (_, { dispatch, extra }) => {
      const { data } = await extra.get<Movies>(HTTP.MOVIES);
      dispatch(ACTIONS.setMovies(data))
      dispatch(setMovieCover(data[data.length - 1]));
    }),

  fetchCurrentMovie: createAsyncThunk<any, string, AsyncThunkResult>(
    'current/fetchCurrentMovie',
    async (id, { dispatch, extra, rejectWithValue, fulfillWithValue }) => {
      try {
        const response = await extra.get<Movie>(HTTP.CURRENT_MOVIE.replace(/id/g, id));
        return fulfillWithValue(response.data)
      } catch (err) {
        return rejectWithValue('')
      }
    }),



}


