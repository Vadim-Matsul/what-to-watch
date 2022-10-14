import { AnyAction } from '@reduxjs/toolkit';
import { Movie } from '../../../../types/movies';
import { Reviews } from '../../../../types/reviews';
import { API_ACTIONS } from '../../../labouring/api-actions/api-actions';

export interface currentSliceState_Interface {
  current_movie: Movie | null,
  current_movie_reviews: Reviews,
  status: 'fulfilled' | 'rejected' | 'pending' | 'none'
}

type CurrentMovieJeneric = typeof API_ACTIONS['fetchCurrentMovie']

type CurrentMovie_Fulfilled = ReturnType<CurrentMovieJeneric['fulfilled']>
type CurrentMovie_Rejected = ReturnType<CurrentMovieJeneric['rejected']>

export const isCurrentMovie_Fulfilled = (action: AnyAction): action is CurrentMovie_Fulfilled => action.type === 'current/fetchCurrentMovie/fulfilled';
export const isCurrentMovie_Rejected = (action: AnyAction): action is CurrentMovie_Rejected => action.type === 'current/fetchCurrentMovie/rejected';

