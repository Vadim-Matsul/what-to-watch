import { Action, AnyAction } from '@reduxjs/toolkit';
import { Movie, Movies } from '../../../../types/movies';
import { API_ACTIONS } from '../../../labouring/api-actions/api-actions';
import { Status } from '../../../store.types';

export interface basicInitialState_Interface {
  movies: Movies,
  movie_cover: Movie | null,
  favorites_movies: Movies,
  status: Status
}

