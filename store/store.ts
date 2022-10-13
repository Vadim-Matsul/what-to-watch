import { configureStore } from '@reduxjs/toolkit';
import { rootReducer, test_state } from './reducers/root-reducer';
import { createAxiosInstance } from '../services/api';
import { createWrapper } from 'next-redux-wrapper';
import { HYDRATE } from 'next-redux-wrapper'
import { constrictType } from '../helpers/utils/utils';
import thunk from 'redux-thunk';
import { RootActions } from './labouring/actions/actions';

export const api = createAxiosInstance();

export const makeStore = () => configureStore<test_state, RootActions>({
  reducer: rootReducer,
  middleware: [thunk.withExtraArgument(api)]
});

export const store = makeStore();

export const wrapper_Server_Client = createWrapper<typeof store>(makeStore);

export const HYDRATE_ACTION = {
  type: constrictType(HYDRATE),
  payload: store['getState']()
};
