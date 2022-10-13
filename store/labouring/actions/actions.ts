import { setActiveGenre } from '../../reducers/app-reducer/app-slice'
import { setMovies, setMovieCover, setFavoritesMovies } from '../../reducers/data-reducer/basic-slice/basic-slice'
import { setCurrentMovie, setCurrentMovieReviews } from '../../reducers/data-reducer/current-slice/current-slice'

export const ACTIONS = {
  setMovies,
  setMovieCover,
  setFavoritesMovies,
  setActiveGenre,
  setCurrentMovie,
  setCurrentMovieReviews
}

export type RootActions =
  | ReturnType<typeof setMovies>
  | ReturnType<typeof setMovieCover>
  | ReturnType<typeof setFavoritesMovies>
  | ReturnType<typeof setActiveGenre>
  | ReturnType<typeof setCurrentMovie>
  | ReturnType<typeof setCurrentMovieReviews>

