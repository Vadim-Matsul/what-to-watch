import { ALL_GENRES } from '../../../helpers/const/const';
import { appInitialState_Interface } from './app-types';

export const appInitialState: appInitialState_Interface = {
  active_genre: ALL_GENRES,
  active_movie_item: 'Details',
  active_fav_id: 0
}