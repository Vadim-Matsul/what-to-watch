import { AxiosInstance } from 'axios';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootActions } from './labouring/actions/actions';
import { store } from './store';

type RootStore = typeof store;

export type RootState = ReturnType<RootStore['getState']>;

export type ThunkActionResult = ThunkAction<void, RootState, AxiosInstance, RootActions>

export type ThunkDispatchResult = ThunkDispatch<RootState, AxiosInstance, RootActions>


