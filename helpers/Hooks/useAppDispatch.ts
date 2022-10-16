import { AsyncThunkAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import { AsyncThunkResult, RootState } from '../../store/store.types';

export type AsyncDispatch = Dispatch<AsyncThunkAction<any, any, AsyncThunkResult>>;
export const useAppDispatch = () => useDispatch() as AsyncDispatch;
