import { UserData } from '../../../types/user'

export type AuthStatus = 'AUTH' | 'NOAUTH' | 'UNKNOWN'

export interface userInitialState_Interface {
  user: UserData | null,
  authStatus: AuthStatus
}