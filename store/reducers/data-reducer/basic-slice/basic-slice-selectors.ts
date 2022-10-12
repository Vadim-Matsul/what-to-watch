import { Movies } from '../../../../types/types';
import { Selector } from '../../../store.types';



export const getMovies: Selector<Movies> = (state) => state.data.basic.movies;
