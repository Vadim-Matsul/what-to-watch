import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './reducers/root-reducer';
import { createAxiosInstance } from '../services/api';
import { createWrapper } from 'next-redux-wrapper';
import { constrictType } from './store.types';
import { HYDRATE } from 'next-redux-wrapper'

export const api = createAxiosInstance();

export const makeStore = () => configureStore
  ({
    reducer: rootReducer,
    middleware: (defaultMiddleware) => defaultMiddleware({
      thunk: { extraArgument: api },
    }),
  });

export const store = makeStore();

export const wrapper_Server_Client = createWrapper<typeof store>(makeStore);

export const HYDRATE_ACTION = {
  type: constrictType(HYDRATE),
  payload: store['getState']()
};
