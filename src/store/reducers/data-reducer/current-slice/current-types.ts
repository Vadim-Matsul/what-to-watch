import { AnyAction, PayloadAction } from '@reduxjs/toolkit';

import { API_ACTIONS } from '../../../labouring/api-actions/api-actions';
import { API_NAMES } from '../../../../helpers/const/const';
import { Reviews } from '../../../../types/reviews';
import { Movie } from '../../../../types/movies';
import { Status } from '../../../../types/user';


export interface currentSliceState_Interface {
  current_movie: Movie | null,
  current_movie_reviews: Reviews,
  status: Status
};

type CurrentMovieJeneric = typeof API_ACTIONS['fetchCurrentMovie'];

export type CurrentMovie_Fulfilled = ReturnType<CurrentMovieJeneric['fulfilled']>;
type CurrentMovie_Rejected = ReturnType<CurrentMovieJeneric['rejected']>;

export const isCurrentMovie_Fulfilled = (action: AnyAction): action is CurrentMovie_Fulfilled => action.type === API_NAMES.fetchCurrentMovie + '/fulfilled';
export const isCurrentMovie_Rejected = (action: AnyAction): action is CurrentMovie_Rejected => action.type === API_NAMES.fetchCurrentMovie + '/rejected';
