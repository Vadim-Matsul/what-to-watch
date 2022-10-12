import { Selector } from '../../store.types';


export const getActiveGenre: Selector<string> = (state) => state.app.active_genre;