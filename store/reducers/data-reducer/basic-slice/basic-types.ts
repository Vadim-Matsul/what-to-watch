import { AnyAction } from '@reduxjs/toolkit';
import { API_NAMES } from '../../../../helpers/const/const';
import { Movie, Movies } from '../../../../types/movies';
import { Status } from '../../../../types/user';
import { API_ACTIONS } from '../../../labouring/api-actions/api-actions';

export interface basicInitialState_Interface {
  movies: Movies,
  movie_cover: Movie | null,
  favorites_movies: Movies,
  status: Status
}

type FetchMovies_Jeneric = typeof API_ACTIONS['fetchMovies'];
type FetchFavoritesMovies_Jeneric = typeof API_ACTIONS['fetchFavorites'];

export type FetchMovies_Fulfilled = ReturnType<FetchMovies_Jeneric['fulfilled']>;

export type FetchFavoritesMovies_F = ReturnType<FetchFavoritesMovies_Jeneric['fulfilled']>;
export type FetchFavoritesMovies_R = ReturnType<FetchFavoritesMovies_Jeneric['rejected']>;
export type FetchFavoritesMovies_P = ReturnType<FetchFavoritesMovies_Jeneric['pending']>;

export const isFetchFavoritesMovies_F = (action: AnyAction): action is FetchFavoritesMovies_F => action.type === API_NAMES.fetchFavorites + '/fulfilled';
export const isFetchFavoritesMovies_R = (action: AnyAction): action is FetchFavoritesMovies_R => action.type === API_NAMES.fetchFavorites + '/rejected';
export const isFetchFavoritesMovies_P = (action: AnyAction): action is FetchFavoritesMovies_P => action.type === API_NAMES.fetchFavorites + '/pending';


