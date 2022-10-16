import { AnyAction, AsyncThunkAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import type { Dispatch } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { HYDRATE_ACTION, store } from './store';


type RootStore = typeof store;

export type RootState = ReturnType<RootStore['getState']>;

export type Selector<R = any, S = RootState> = (state: S) => R;

export type HYDRATE_ACTION_TYPE = typeof HYDRATE_ACTION;

export type AsyncThunkResult = {
  dispatch: ThunkDispatch<RootState, AxiosInstance, AnyAction>,
  state: RootState,
  extra: AxiosInstance,
};
