import { setMovies, setMovieCover, setFavoritesMovies } from '../../reducers/data-reducer/basic-slice/basic-slice'

export const ACTIONS = {
  setMovies,
  setMovieCover,
  setFavoritesMovies
}

export type RootActions =
  | ReturnType<typeof setMovies>
  | ReturnType<typeof setMovieCover>
  | ReturnType<typeof setFavoritesMovies>
