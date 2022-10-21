import { setActiveFavId, setActiveGenre, setActiveMovieItem } from '../../reducers/app-reducer/app-slice'
import { setMovies, setMovieCover, setFavoritesMovies } from '../../reducers/data-reducer/basic-slice/basic-slice'
import { setCurrentMovie, setCurrentMovieReviews } from '../../reducers/data-reducer/current-slice/current-slice'
import { setAuthStatus, setUser } from '../../reducers/user-reducer/user-slice'

export const ACTIONS = {
  setMovies,
  setMovieCover,
  setFavoritesMovies,
  setActiveGenre,
  setActiveMovieItem,
  setCurrentMovie,
  setCurrentMovieReviews,
  setUser,
  setAuthStatus,
  setActiveFavId
}
