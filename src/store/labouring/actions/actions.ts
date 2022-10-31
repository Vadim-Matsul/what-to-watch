import { setMovies, setMovieCover, setFavoritesMovies } from '../../reducers/data-reducer/basic-slice/basic-slice';
import { setCurrentMovie, setCurrentMovieReviews } from '../../reducers/data-reducer/current-slice/current-slice';
import { setActiveFavId, setActiveGenre, setActiveMovieItem } from '../../reducers/app-reducer/app-slice';
import { setAuthStatus, setStatusUser, setUser } from '../../reducers/user-reducer/user-slice';

export const ACTIONS = {
  setCurrentMovieReviews,
  setActiveMovieItem,
  setFavoritesMovies,
  setCurrentMovie,
  setActiveGenre,
  setActiveFavId,
  setMovieCover,
  setStatusUser,
  setAuthStatus,
  setMovies,
  setUser,
};
