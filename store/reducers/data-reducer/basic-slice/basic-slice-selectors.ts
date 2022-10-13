import { Movies } from '../../../../types/movies';
import { Selector } from '../../../store.types';



export const getMovies: Selector<Movies> = (state) => state.data.basic.movies;
