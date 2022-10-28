import React from 'react';
import { ReviewFormRatingProps } from './ReviewFormRating.props';


export const ReviewFormRating = React.forwardRef<HTMLDivElement, ReviewFormRatingProps>(
  ({ setRating, error }, ref) => {
    const Rating = [1, 2, 3, 4, 5];

    const handleChangeRating = (evt: React.MouseEvent<HTMLInputElement>) => {
      const { value } = evt.target as HTMLInputElement;
      setRating(value);
    };

    return (
      <div className="rating" ref={ref} >
        <div className="rating__stars">
          {Rating.map(r => (
            <React.Fragment key={r} >
              <input
                className="rating__input"
                id={`star-${r}`}
                type="radio"
                value={r}
                name='rating'
                onClick={handleChangeRating}
              />
              <label
                className="rating__label"
                data-testid='label'
                htmlFor={`star-${r}`}>Rating {r}</label>
            </React.Fragment>
          ))}
        </div>
        {error && <div className='center' data-testid='error'>{error.message}</div>}
      </div >
    );
  });

ReviewFormRating.displayName = 'ReviewFormRating';
