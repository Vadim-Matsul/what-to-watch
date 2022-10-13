import { Movie, Movies } from '../../../../types/movies';

export interface basicInitialState_Interface {
  movies: Movies,
  movie_cover: Movie | null,
  favorites_movies: Movies,
  status: string
}
