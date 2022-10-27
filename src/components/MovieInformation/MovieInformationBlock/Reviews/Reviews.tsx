import { devideToThree } from '../../../../helpers/utils/utils';
import { Review } from './Review/Review';
import { ReviewsProps } from './Reviews.props';


export const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  const convertedReviews = devideToThree(reviews);

  return (
    <>
      {convertedReviews.length
        ? convertedReviews.map((block, i) =>
          <div className="movie-card__reviews-col" key={i} data-testid='wrapper' >
            {block.map(review => <Review key={review.id} review={review} />)}
          </div>
        )
        : <h1>Be the first to commnet!</h1>}
    </>
  );
};
