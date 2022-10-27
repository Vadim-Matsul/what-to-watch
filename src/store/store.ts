import { Action, AnyAction, AsyncThunkAction, configureStore } from '@reduxjs/toolkit';
import { rootReducer, ConfigState } from './reducers/root-reducer';
import { createAxiosInstance } from '../services/api';
import { createWrapper } from 'next-redux-wrapper';
import { HYDRATE } from 'next-redux-wrapper'
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { constrictType } from './store.types';

export const api = createAxiosInstance();


const middlewareThunk = [thunk.withExtraArgument(api)]

export const makeStore = () => configureStore<
  ConfigState,
  Action,
  Array<ThunkMiddleware<ConfigState, Action, AxiosInstance>>
>({
  reducer: rootReducer,
  middleware: middlewareThunk
});


export const store = makeStore();
export const wrapper_Server_Client = createWrapper<typeof store>(makeStore);

export const HYDRATE_ACTION = {
  type: constrictType(HYDRATE),
  payload: store['getState']()
};