import { combineReducers } from '@reduxjs/toolkit';
import { dataReducer } from './data-reducer/data-slice';

export const rootReducer = combineReducers({
  data: dataReducer
});

export type State_for_Config = ReturnType< typeof rootReducer >
