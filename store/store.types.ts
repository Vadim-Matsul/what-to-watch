import { AnyAction, AsyncThunkAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import { RootActions } from './labouring/actions/actions';
import { HYDRATE_ACTION, store } from './store';

type RootStore = typeof store;

export type RootState = ReturnType<RootStore['getState']>;

export type Selector<R = any, S = RootState> = (state: S) => R

export type HYDRATE_ACTION_TYPE = typeof HYDRATE_ACTION

export type AsyncThunkResult = {
  dispatch: ThunkDispatch<RootState, AxiosInstance, RootActions>,
  state: RootState,
  extra: AxiosInstance,
}
