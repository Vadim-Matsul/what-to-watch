import { combineReducers } from '@reduxjs/toolkit';
import { appSlice } from './app-reducer/app-slice';
import { dataReducer } from './data-reducer/data-reducer.combine';

export const rootReducer = combineReducers({
  data: dataReducer,
  app: appSlice.reducer
});

export type ConfigState = ReturnType<typeof rootReducer>
