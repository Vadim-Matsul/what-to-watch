import { Movies } from '../../../types/types';
import { ACTIONS } from '../actions/actions';
import { RootState, ThunkDispatchResult } from '../../store.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';



export const API_ACTIONS = {

  fetchMovies: createAsyncThunk<
    void,
    void, {
      dispatch: ThunkDispatchResult,
      extra: AxiosInstance
    }>(
      'basic/fetchMovies', async (_, { dispatch, extra }) => {
        const { data } = await extra.get<Movies>('/films');
        dispatch(ACTIONS.setMovies(data))
      })

}
