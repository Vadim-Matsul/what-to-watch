import { createSlice, PayloadAction, ActionCreatorWithOptionalPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { optionsMenu } from '../../../types/movies';
import { appInitialState } from './app-state';


export const appSlice = createSlice({
  name: 'app',
  initialState: appInitialState,
  reducers: {
    setActiveGenre(state, action: PayloadAction<string>) {
      state.active_genre = action.payload
    },
    setActiveMovieItem(state, action: PayloadAction<optionsMenu>) {
      state.active_movie_item = action.payload
    }
  }
});


export const { setActiveGenre, setActiveMovieItem } = appSlice.actions;
