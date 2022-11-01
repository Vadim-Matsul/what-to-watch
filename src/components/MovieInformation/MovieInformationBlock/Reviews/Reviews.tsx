import { devideToThree } from '../../../../helpers/utils/utils';
import { ReviewsProps } from './Reviews.props';
import { Review } from './Review/Review';
import React from 'react';


export const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  const convertedReviews = reviews.length ? devideToThree(reviews) : [];

  return (
    <>
      {convertedReviews.length
        ? convertedReviews.map((block, i) =>
          <div className="movie-card__reviews-col" key={i} data-testid='wrapper' >
            {block.map((review, i) => <Review key={review.id + i} review={review} />)}
          </div>
        )
        : <h1>Be the first to commnet!</h1>}
    </>
  );
};
