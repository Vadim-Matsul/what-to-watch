import { Movies } from '../../../types/types';
import { ACTIONS } from '../actions/actions';
import { AsyncThunkResult, RootState, ThunkDispatchResult } from '../../store.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { HTTP } from '../../../helpers/const/const';



export const API_ACTIONS = {

  fetchMovies: createAsyncThunk<void, void, AsyncThunkResult>(
    'basic/fetchMovies',
    async (_, { dispatch, extra }) => {
      const { data } = await extra.get<Movies>(HTTP.FILMS);
      dispatch(ACTIONS.setMovies(data))
    }),

}
