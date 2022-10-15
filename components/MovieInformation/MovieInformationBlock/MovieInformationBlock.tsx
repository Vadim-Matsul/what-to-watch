import { useSelector } from 'react-redux'
import { spotActiveNavClass } from '../../../helpers/utils/utils';
import { getActiveMovieItem } from '../../../store/reducers/app-reducer/app-slice-selectors'
import { MovieInformationBlockProps } from './MovieInformationBlock.props';
import classNames from 'classnames';
import { Overview } from './Overview/Overview';
import { Details } from './Details/Details';
import { OverviewAdditional } from './Overview/OverviewAdditional/OverviewAdditional';
import { Reviews } from './Reviews/Reviews';

export const MovieInformationBlock: React.FC<MovieInformationBlockProps> = (props) => {

  const { movie_infogmation, reviews } = props;

  const activeItemNav = useSelector(getActiveMovieItem);
  const activeItemClass = spotActiveNavClass(activeItemNav);

  const isOverview = activeItemNav === 'Overview';
  const isDetails = activeItemNav === 'Details';
  const isReviews = activeItemNav === 'Reviews';

  const wrapperBlock = classNames(`movie-card__${activeItemClass}`, {
    'movie-card__row': isDetails || isReviews
  });

  return (
    <>
      {isOverview &&
        <OverviewAdditional
          movie_rating={movie_infogmation.rating}
          scores_count={movie_infogmation.scores_count}
        />
      }

      <div className={wrapperBlock}>
        {isOverview && <Overview info={movie_infogmation} />}
        {isDetails && <Details info={movie_infogmation} />}
        {isReviews && <Reviews reviews={reviews} />}
      </div>
    </>
  )
}