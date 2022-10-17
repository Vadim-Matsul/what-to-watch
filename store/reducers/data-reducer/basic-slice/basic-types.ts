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
export type FetchMovies_Fulfilled = ReturnType<FetchMovies_Jeneric['fulfilled']>;
