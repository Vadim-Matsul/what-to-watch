import { Reviews } from '../../../../types/reviews';
import { Movie } from '../../../../types/movies';
import { Selector } from '../../../store.types';


export const getCurrentMovie: Selector<Movie> = (state) => state.data.current.current_movie!;
export const getCurrentMovieReviews: Selector<Reviews> = (state) => state.data.current.current_movie_reviews;
