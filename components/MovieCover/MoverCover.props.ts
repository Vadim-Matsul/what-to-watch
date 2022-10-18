import { Movie } from '../../types/movies';
import { Reviews } from '../../types/reviews';

export interface MovieCoverProps {
  movie: Movie,
  reviews?: Reviews,
  shouldShowBreadcrumbsHeader?: boolean
}