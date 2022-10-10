import { combineReducers } from '@reduxjs/toolkit';
import { basicSlice } from './basic-slice/basic-slice';

export const dataReducer = combineReducers({
  basic: basicSlice.reducer
});
