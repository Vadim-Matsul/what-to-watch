import { optionsMenu } from '../../../types/movies';
import { Selector } from '../../store.types';


export const getActiveGenre: Selector<string> = (state) => state.app.active_genre;
export const getActiveMovieItem: Selector<optionsMenu> = (state) => state.app.active_movie_item;
