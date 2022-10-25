import { AnyAction } from '@reduxjs/toolkit';
import { API_NAMES } from '../../../helpers/const/const';
import { Status, UserData } from '../../../types/user'
import { API_ACTIONS } from '../../labouring/api-actions/api-actions'

export type AuthStatus = 'AUTH' | 'NOAUTH' | 'UNKNOWN'

export interface userInitialState_Interface {
  user: UserData | null,
  authStatus: AuthStatus,
  status: Status
}

type checkAutorization_Jeneric = typeof API_ACTIONS.checkAutorization;

type checkAutorization_Fulfilled = ReturnType<checkAutorization_Jeneric['fulfilled']>;
type checkAutorization_Rejected = ReturnType<checkAutorization_Jeneric['rejected']>;

export const isCheckAutorization_Fulfilled = (action: AnyAction): action is checkAutorization_Fulfilled => action.type === API_NAMES.checkAuthorization + '/fulfilled';
export const isCheckAutorization_Rejected = (action: AnyAction): action is checkAutorization_Rejected => action.type === API_NAMES.checkAuthorization + '/rejected';

