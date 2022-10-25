import { Movie } from '../../../../types/movies';
import { Reviews } from '../../../../types/reviews';
import { Selector } from '../../../store.types';


export const getCurrentMovie: Selector<Movie> = (state) => state.data.current.current_movie;
export const getCurrentMovieReviews: Selector<Reviews> = (state) => state.data.current.current_movie_reviews;
