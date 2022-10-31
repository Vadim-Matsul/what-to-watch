import { optionsMenu } from '../../../types/movies';
import { Selector } from '../../store.types';

export const getActiveMovieItem: Selector<optionsMenu> = (state) => state.app.active_movie_item;
export const getActiveGenre: Selector<string> = (state) => state.app.active_genre;
export const getActiveFavId: Selector<number> = (state) => state.app.active_fav_id;
