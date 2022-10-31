import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { isCurrentMovie_Fulfilled, isCurrentMovie_Rejected } from './current-types';
import { isHydrateAction } from '../../../../helpers/utils/utils';
import { Reviews } from '../../../../types/reviews';
import { currentSliceState } from './current-state';
import { Movie } from '../../../../types/movies';


export const currentSlice = createSlice({
  name: 'current',
  initialState: currentSliceState,
  reducers: {
    setCurrentMovie: (state, action: PayloadAction<Movie>) => {
      state.current_movie = action.payload
    },
    setCurrentMovieReviews(state, action: PayloadAction<Reviews>) {
      state.current_movie_reviews = action.payload
    }
  },
  extraReducers: builder => {

    builder.addMatcher(isHydrateAction, (state, action) => ({
      ...state,
      ...action.payload.data.current
    }));

    builder.addMatcher(isCurrentMovie_Fulfilled, (state, action) => { state.status = action.meta.requestStatus; });

    builder.addMatcher(isCurrentMovie_Rejected, (state, action) => { state.status = action.meta.requestStatus });

  }
});

export const { setCurrentMovie, setCurrentMovieReviews } = currentSlice.actions;
