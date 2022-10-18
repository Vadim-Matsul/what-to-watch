import { AnyAction, AsyncThunkAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import { AsyncThunkResult, RootState } from '../../store/store.types';

export type AsyncDispatch = (action: AsyncThunkAction<any, any, AsyncThunkResult>) => Promise<any>;
export const useAppDispatch = () => useDispatch() as AsyncDispatch;
