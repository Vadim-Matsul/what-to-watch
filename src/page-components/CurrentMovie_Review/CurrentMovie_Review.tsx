import MovieCover from '../../components/MovieCover/MovieCover';
import { CurrentMovieReviewProps } from './CurrentMovieReview.props';


export const CurrentMovieReview: React.FC<CurrentMovieReviewProps> = ({ movie }) => {

  return (
    <MovieCover
      movie={movie}
      shouldShowBreadcrumbsHeader
    />
  );
};