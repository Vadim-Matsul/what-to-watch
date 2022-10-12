import { setActiveGenre } from '../../reducers/app-reducer/app-slice'
import { setMovies, setMovieCover, setFavoritesMovies } from '../../reducers/data-reducer/basic-slice/basic-slice'

export const ACTIONS = {
  setMovies,
  setMovieCover,
  setFavoritesMovies,
  setActiveGenre
}

export type RootActions =
  | ReturnType<typeof setMovies>
  | ReturnType<typeof setMovieCover>
  | ReturnType<typeof setFavoritesMovies>
  | ReturnType<typeof setActiveGenre>
