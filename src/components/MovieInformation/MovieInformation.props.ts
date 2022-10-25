import { MovieInformation } from '../../types/movies';
import { Reviews } from '../../types/reviews';

export interface MovieInformationProps {
  movie_infogmation: MovieInformation,
  reviews: Reviews
}