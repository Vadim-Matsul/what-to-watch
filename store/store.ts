import { Action, AnyAction, AsyncThunkAction, configureStore } from '@reduxjs/toolkit';
import { rootReducer, ConfigState } from './reducers/root-reducer';
import { createAxiosInstance } from '../services/api';
import { createWrapper } from 'next-redux-wrapper';
import { HYDRATE } from 'next-redux-wrapper'
import { constrictType } from '../helpers/utils/utils';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { AxiosInstance } from 'axios';

export const api = createAxiosInstance();



export const makeStore = () => configureStore<
  ConfigState,
  AnyAction,
  Array<ThunkMiddleware<ConfigState, AnyAction, AxiosInstance>>
>({
  reducer: rootReducer,
  middleware: [thunk.withExtraArgument(api)]
});


export const store = makeStore();
export const wrapper_Server_Client = createWrapper<typeof store>(makeStore);

export const HYDRATE_ACTION = {
  type: constrictType(HYDRATE),
  payload: store['getState']()
};
