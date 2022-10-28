import { useForm } from 'react-hook-form';
import { ReviewFormProps } from './ReviewForm.props';
import { ReviewFormRating } from './ReviewFormRating/ReviewFormRating';
import { Controller } from 'react-hook-form';
import { ErrorConfig } from '../../helpers/const/const'
import { ReviewFormData } from '../../types/reviews';
import { useAppDispatch } from '../../helpers/Hooks/useAppDispatch';
import { API_ACTIONS } from '../../store/labouring/api-actions/api-actions';
import { useRouter } from 'next/router';

export const ReviewForm: React.FC<ReviewFormProps> = ({ movieId }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: {
      errors: { comment },
      isSubmitting,
    }
  } = useForm<ReviewFormData>({
    mode: 'onChange',
  });

  const commentRegister = {
    ...register('comment', {
      required: {
        value: true,
        message: ErrorConfig.required
      },
      minLength: {
        value: 50,
        message: ErrorConfig.shortComment
      },
      maxLength: {
        value: 150,
        message: ErrorConfig.longComment
      }
    })
  };

  const handlerFormSubmit = async (data: ReviewFormData) => {
    data.id = movieId;
    await dispatch(API_ACTIONS.postMovieReview(data));
    reset();
    router.back();
  };

  const buttonText = isSubmitting ? 'Pending' : 'Post';

  return (
    <div className="add-review">
      <form
        className="add-review__html-form"
        onSubmit={handleSubmit(handlerFormSubmit)}
        role='form'
      >
        <Controller
          name='rating'
          control={control}
          rules={{
            required: {
              value: true,
              message: ErrorConfig.indicateRating
            }
          }}
          render={({ field, fieldState }) => (
            <ReviewFormRating
              ref={field.ref}
              error={fieldState.error}
              setRating={field.onChange}
            />)
          }
        />
        <div className="add-review__text">
          <textarea
            className="add-review__textarea"
            id="review-text"
            placeholder="Review text"
            {...commentRegister}
          />
          {comment &&
            <div className='center' data-testid='error_comment'>{comment.message}</div>}
          <div className="add-review__submit">
            <button
              className="add-review__btn"
              type="submit"
            >{buttonText}</button>
          </div>
        </div>
      </form>
    </div>
  );
};
