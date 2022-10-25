import { AnyAction, AsyncThunkAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import { HYDRATE_ACTION, store } from './store';


type RootStore = typeof store;

export type RootState = ReturnType<RootStore['getState']>;

export type Selector<R = any, S = RootState> = (state: S) => R;

export type HYDRATE_ACTION_TYPE = typeof HYDRATE_ACTION;

export type AsyncThunkResult = {
  dispatch: ThunkDispatch<RootState, AxiosInstance, AnyAction>,
  state: RootState,
  extra: AxiosInstance,
};

/**
 * Из-за ограничение Типа Action при создании store 
 * нельзя указать возможный AsyncThunkAction, который потенциально может быть опрокинут в dispatch.
 * 
 * Чтобы dispatch, используемый в wrapper_Server_Client, знал, что action может быть ассинхронным,
 * используется isAsyncDispatch Тип
 * 
 * @Jeneric_Returned возвращаемое значение из asyncThunkAction
 */
export type isAsyncDispatch<Returned = void> = {
  dispatch: <R = Returned, A = AsyncThunkAction<R, any, AsyncThunkResult>>(value: A) => Promise<R>
} & RootStore;

export const constrictType = <T extends string>(type: T) => type;
