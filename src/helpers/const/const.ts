import { optionsMenu } from '../../types/movies';

export const ALL_GENRES = 'All genres';

export const isServer = typeof window === 'undefined';

export const CONFIG = {
  BASE: 'https://10.react.pages.academy/wtw/',
  TIMEOUT: 6000,
};

export const FavoritesStatus = {
  ADD: '1',
  DELETE: '0'
};

export const HTTP = {
  MOVIES: 'films',
  FAVORITES: 'favorite',
  CURRENT_MOVIE: 'films/id',
  CURRENT_REVIEWS_MOVIE: 'comments/id',
  LOGIN: 'login',
  LOGOUT: 'logout'
};

export const ToastConfig = {
  toastWait: 'Waiting...',
  s_addedToFav: 'Successfully added',
  s_commentSubmit: 'Successfully sent',
  s_removedFromFav: 'Successfully removed',
  s_authForm: 'Pleasant viewing',
  s_logout: 'Hurry up go back',
  s_player: 'Thanks for watching',
  r_error: 'error, try reload!',
  welcome: 'Welcome ',
  sh_login: 'Would be nice to login',
};

export const API_NAMES = {
  fetchMovies: 'basic/fetchMovies',
  fetchFavorites: 'basic/fetchFavorites',
  changeFavorites: 'basic/changeFavorites',
  fetchCurrentMovie: 'current/fetchCurrentMovie',
  checkAuthorization: 'user/checkAutorization',
  sendUserData: 'user/sendUserData',
  logoutSession: 'user/logoutSession',
  postMovieReview: 'current/postMovieReview',
};

export const bePagesPaths = {
  currentMovie: '/films/[id]',
  currentMovieReview: '/films/[id]/review',
  player: '/player/id',
  login: '/login',
  main: '/',
  favorite: '/favorites',
};

export const ErrorConfig = {
  required: 'Required field',
  incorrectEmail: 'Incorrect email',
  incorrectPassword: 'Password must contain letters and numbers',
  shortPassword: 'Password must be more than 8 symbols',
  shortComment: 'Please enter a comment over then 50 symbols',
  longComment: 'You are very eloquent, please write less than 150 characters',
  indicateRating: 'Please indicate the rating',
  globalError: 'Oops, try reloading the page',
}

export const CurrentMovieNav = ['Overview', 'Details', 'Reviews'] as optionsMenu[];

export const Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const testApi = {
  jwt: '/api/handler-token'
}
