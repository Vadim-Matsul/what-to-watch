import { createSlice, PayloadAction, ActionCreatorWithOptionalPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { appInitialState } from './app-state';


export const appSlice = createSlice({
  name: 'app',
  initialState: appInitialState,
  reducers: {
    setActiveGenre: (state, action: PayloadAction<string>) => {
      state.active_genre = action.payload
    }
  }
});


export const { setActiveGenre } = appSlice.actions;
