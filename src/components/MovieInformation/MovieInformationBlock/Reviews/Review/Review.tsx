import { getDate } from '../../../../../helpers/utils/utils'
import { ReviewProps } from './Review.props'


export const Review: React.FC<ReviewProps> = ({ review }) => {
  const [dateTime, reviewDate] = getDate(review.date);


  return (
    <div className="review">

      <blockquote className="review__quote">
        <p className="review__text handle-review-text">{review.comment}</p>
        <footer className="review__details">
          <cite className="review__author">{review.user.name}</cite>
          <time className="review__date" dateTime={dateTime} data-testid='date'>{reviewDate}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{review.rating}</div>

    </div>
  );
};
