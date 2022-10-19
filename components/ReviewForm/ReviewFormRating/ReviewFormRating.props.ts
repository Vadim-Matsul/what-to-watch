import { FieldError } from 'react-hook-form';

export interface ReviewFormRatingProps {
  setRating: (r: string) => void,
  error?: FieldError
}