import { Movie } from '../../../../types/movies';
import { Reviews } from '../../../../types/reviews';

export interface currentSliceState_Interface {
  current_movie: Movie | null,
  current_movie_reviews: Reviews
}