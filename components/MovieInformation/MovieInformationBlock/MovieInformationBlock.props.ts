import { MovieInformation } from '../../../types/movies';
import { Reviews } from '../../../types/reviews';

export interface MovieInformationBlockProps {
  movie_infogmation: MovieInformation,
  reviews: Reviews
}