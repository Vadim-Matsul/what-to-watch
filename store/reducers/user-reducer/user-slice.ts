import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isHydrateAction } from '../../../helpers/utils/utils';
import { User } from '../../../types/reviews';
import { UserData } from '../../../types/user';
import { userInitialState } from './user-state';
import { AuthStatus } from './user-types';



export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    setUser(state, action: PayloadAction<UserData>) {
      state.user = action.payload
    },
    setAuthStatus(state, action: PayloadAction<AuthStatus>) {
      state.authStatus = action.payload
    }
  },
  extraReducers: builder => {
    builder.addMatcher(isHydrateAction, (state, action) => {
      return {
        ...state,
        ...action.payload.user
      }
    });
  }
});

export const { setUser, setAuthStatus } = userSlice.actions;
