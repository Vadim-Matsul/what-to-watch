import { combineReducers } from '@reduxjs/toolkit';
import { appSlice } from './app-reducer/app-slice';
import { dataReducer } from './data-reducer/data-reducer.combine';
import { userSlice } from './user-reducer/user-slice';

export const rootReducer = combineReducers({
  data: dataReducer,
  app: appSlice.reducer,
  user: userSlice.reducer
});

export type ConfigState = ReturnType<typeof rootReducer>;
