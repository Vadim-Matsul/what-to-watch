import {
  getActiveFavId as getActiveFavIdSelector,
  getActiveGenre as getActiveGenreSelector,
  getActiveMovieItem as getActiveMovieItemSelector,
} from './app-reducer/app-slice-selectors';

import {
  getBasicStatus as getBasicStatusSelector,
  getFavoritesMovies as getFavoritesMoviesSelector,
  getMovieCover as getMovieCoverSelector,
  getMovies as getMoviesSelector,
  getSortedFavoritesMovies as getSortedFavoritesMoviesSelector,
  getSortedMovies as getSortedMoviesSelector,
} from './data-reducer/basic-slice/basic-slice-selectors';

import {
  getCurrentMovie as getCurrentMovieSelector,
  getCurrentMovieReviews as getCurrentMovieReviewsSelector,
} from './data-reducer/current-slice/current-slice-selectors';

import {
  getAuthStatus as getAuthStatusSelector,
  getStatusProgress as getStatusProgressSelector,
  getUser as getUserSelector,
} from './user-reducer/user-slice-selectors';



/** store/data/current */
export const getCurrentMovie = getCurrentMovieSelector;
export const getCurrentMovieReviews = getCurrentMovieReviewsSelector;

/** store/data/basic */
export const getMovies = getMoviesSelector;
export const getMovieCover = getMovieCoverSelector;
export const getBasicStatus = getBasicStatusSelector;
export const getSortedMovies = getSortedMoviesSelector;
export const getFavoritesMovies = getFavoritesMoviesSelector;
export const getSortedFavoritesMovies = getSortedFavoritesMoviesSelector;

/** store/app */
export const getActiveGenre = getActiveGenreSelector;
export const getActiveFavId = getActiveFavIdSelector;
export const getActiveMovieItem = getActiveMovieItemSelector;

/** store/user */
export const getUser = getUserSelector;
export const getAuthStatus = getAuthStatusSelector;
export const getStatusProgress = getStatusProgressSelector;
