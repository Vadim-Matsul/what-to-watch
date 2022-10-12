import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers/root-reducer';
import { createAxiosInstance } from '../services/api';
import { createWrapper } from 'next-redux-wrapper';

const api = createAxiosInstance();

export const makeStore = () => configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      }
    }),
});

export const store = makeStore();
export const wrapper_Server_Client = createWrapper<typeof store>(makeStore);
