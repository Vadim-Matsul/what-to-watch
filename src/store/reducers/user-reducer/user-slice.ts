import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthStatus, isCheckAutorization_Fulfilled, isCheckAutorization_Rejected } from './user-types';
import { isHydrateAction } from '../../../helpers/utils/utils';
import { Status, UserData } from '../../../types/user';
import { userInitialState } from './user-state';


export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    setUser(state, action: PayloadAction<UserData>) {
      state.user = action.payload
    },
    setAuthStatus(state, action: PayloadAction<AuthStatus>) {
      state.authStatus = action.payload
    },
    setStatusUser(state, action: PayloadAction<Status>) {
      state.status = action.payload
    }
  },
  extraReducers: builder => {

    builder.addMatcher(isHydrateAction, (state, action) => {
      return {
        ...state,
        ...action.payload.user
      }
    });

    builder.addMatcher(isCheckAutorization_Fulfilled, (state, action) => { state.status = action.meta.requestStatus });

    builder.addMatcher(isCheckAutorization_Rejected, (state, action) => { state.status = action.meta.requestStatus });

  }
});

export const { setUser, setAuthStatus, setStatusUser } = userSlice.actions;
