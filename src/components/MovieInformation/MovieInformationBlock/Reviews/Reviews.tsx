import { devideToThree } from '../../../../helpers/utils/utils';
import { ReviewsProps } from './Reviews.props';
import { Review } from './Review/Review';


export const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  const convertedReviews = devideToThree(reviews);

  return (
    <>
      {convertedReviews.length
        ? convertedReviews.map((block, i) =>
          <div className="movie-card__reviews-col" key={i + block[i].rating} data-testid='wrapper' >
            {block.map(review => <Review key={review.id + i} review={review} />)}
          </div>
        )
        : <h1>Be the first to commnet!</h1>}
    </>
  );
};
