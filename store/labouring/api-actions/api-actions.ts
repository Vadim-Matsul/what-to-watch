import { Movies } from '../../../types/types';
import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../store';
import { AxiosInstance } from 'axios';
import { ACTIONS, RootActions } from '../actions/actions';

type ThunkActionResult<R = Promise<void>> = ThunkAction<R, RootState, AxiosInstance, RootActions>

export const API_ACTIONS = {

  fetchMovies: (): ThunkActionResult => async (dispatch, _getState, api) => {
    const { data } = await api.get<Movies>('/films');
    dispatch(ACTIONS.setMovies(data))
  }

}
