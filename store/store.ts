import { configureStore } from '@reduxjs/toolkit';
import { rootReducer, State_for_Config } from './reducers/root-reducer';
import type { ThunkDispatch, ThunkAction } from 'redux-thunk';
import type { AxiosInstance } from 'axios';
import { RootActions } from './labouring/actions/actions';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import thunk from 'redux-thunk';
import { createAxiosInstance } from '../services/api';

const api = createAxiosInstance();

export const makeStore = () => configureStore<State_for_Config>({
  reducer: rootReducer,
  middleware: [thunk.withExtraArgument(api)]
});

export const store = makeStore();

type RootStore = typeof store;

export type RootState = ReturnType<RootStore['getState']>;

export type ThunkActionResult = ThunkAction<void, RootState, AxiosInstance, RootActions>

export type ThunkDispatchResult = ThunkDispatch<RootState, AxiosInstance, RootActions>



  export type HYDRATE_ACTION = { type: typeof HYDRATE, payload: RootState };

export const wrapper_Server_Client = createWrapper<RootStore>(makeStore);