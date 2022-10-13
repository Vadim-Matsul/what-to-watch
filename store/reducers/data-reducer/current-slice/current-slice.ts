import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isHydrateAction } from '../../../../helpers/utils/utils';
import { Movie } from '../../../../types/movies';
import { Reviews } from '../../../../types/reviews';
import { currentSliceState } from './current-state';


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
    })
    )
  }
});

export const { setCurrentMovie, setCurrentMovieReviews } = currentSlice.actions;
