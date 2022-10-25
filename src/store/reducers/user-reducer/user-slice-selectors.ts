import { Status, UserData } from '../../../types/user';
import { Selector } from '../../store.types';
import { AuthStatus } from './user-types';


export const getUser: Selector<UserData> = (state) => state.user.user;
export const getAuthStatus: Selector<AuthStatus> = (state) => state.user.authStatus;
export const getStatusProgress: Selector<Status> = (state) => state.user.status;
