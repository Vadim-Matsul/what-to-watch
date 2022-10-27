import { PickRatingRang } from '../../../../../helpers/utils/utils';
import { OverviewAdditionalProps } from './OverviewAdditional.props'


export const OverviewAdditional: React.FC<OverviewAdditionalProps> = (props) => {
  const { movie_rating, scores_count } = props;
  const rang = PickRatingRang(movie_rating);

  return (
    <div className="movie-rating">
      <div className="movie-rating__score">{movie_rating}</div>
      <p className="movie-rating__meta">
        <span className="movie-rating__level" data-testid='rang'>{rang}</span>
        <span className="movie-rating__count">{scores_count} ratings</span>
      </p>
    </div>
  );
};
