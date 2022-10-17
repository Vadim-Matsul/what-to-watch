import { optionsMenu } from '../../types/movies';

export const ALL_GENRES = 'All genres';

export const isServer = typeof window === 'undefined';

export const CONFIG = {
  BASE: 'https://10.react.pages.academy/wtw/',
  TIMEOUT: 6000,
};

export const HTTP = {
  MOVIES: 'films',
  CURRENT_MOVIE: 'films/id',
  CURRENT_REVIEWS_MOVIE: 'comments/id',
  LOGIN: 'login',
  LOGOUT: 'logout'
};

export const API_NAMES = {
  fetchMovies: 'basic/fetchMovies',
  fetchCurrentMovie: 'current/fetchCurrentMovie',
  checkAuthorization: 'user/checkAutorization',
  sendUserData: 'user/sendUserData',
  logoutSession: 'user/logoutSession'
};

export const bePagesPaths = {
  currentMovie: '/films/[id]',
  login: '/login',
  main: '/'
};

export const ErrorConfig = {
  required: 'Required field',
  incorrectEmail: 'Incorrect email',
  incorrectPassword: 'Password must contain letters and numbers',
  shortPassword: 'Password must be more than 8 symbols',
  globalError: 'Oops, try reloading the page'
}

export const CurrentMovieNav = ['Overview', 'Details', 'Reviews'] as optionsMenu[];

export const Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
