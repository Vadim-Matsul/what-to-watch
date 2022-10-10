import { Movie, Movies } from '../../../../types/types';

export interface basicInitialState_Interface {
  movies: Movies,
  movie_cover: Movie | null,
  favorites_movies: Movies
}
