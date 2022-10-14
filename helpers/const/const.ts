import { optionsMenu } from '../../components/MovieInformation/MovieInformation';

export const ALL_GENRES = 'All genres';

export const CONFIG = {
  BASE: 'https://10.react.pages.academy/wtw/',
  TIMEOUT: 6000,
};

export const HTTP = {
  MOVIES: 'films',
  CURRENT_MOVIE: 'films/id',
  COVER_MOVIE: 'films/promo'
};

export const API_NAMES = {
  fetchCurrentMovie: 'current/fetchCurrentMovie'
};

export const bePagesPaths = {
  currentMovie: '/films/[id]'
};

export const CurrentMovieNav = ['Overview', 'Details', 'Reviews'] as optionsMenu[];