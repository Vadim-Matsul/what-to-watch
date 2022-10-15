import { Movie } from '../../types/movies';
import { Reviews } from '../../types/reviews';

export interface CurrentMovieProps {
  currentMovie: Movie,
  currentReviews: Reviews
}