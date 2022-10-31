import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    },
    setActiveFavId(state, action: PayloadAction<number>) {
      state.active_fav_id = action.payload
    }
  }
});

export const { setActiveGenre, setActiveMovieItem, setActiveFavId } = appSlice.actions;
