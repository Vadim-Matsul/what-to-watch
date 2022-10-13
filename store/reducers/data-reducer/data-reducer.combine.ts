import { combineReducers } from '@reduxjs/toolkit';
import { basicSlice } from './basic-slice/basic-slice';
import { currentSlice } from './current-slice/current-slice';

export const dataReducer = combineReducers({
  basic: basicSlice.reducer,
  current: currentSlice.reducer
});
