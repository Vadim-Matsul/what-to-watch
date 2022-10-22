import { AnyAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { deleteOrderFavorite, getOrderFavorites, setOrderFav, setOrderFavorites } from '../../services/storage';
import { basicInitialState_Interface } from '../../store/reducers/data-reducer/basic-slice/basic-types';
import { HYDRATE_ACTION_TYPE, RootState } from '../../store/store.types';
import { Movie, movieFavoriteData, Movies, optionsMenu, OrderDataObj } from '../../types/movies';
import { Reviews } from '../../types/reviews';
import { ALL_GENRES, Months } from '../const/const';


export const getMoviesGenres = (movies: Movies): string[] => {
  const allGenres = Array.from(
    new Set(
      movies.map(movie => movie.genre)
    )
  ).sort();
  allGenres.splice(0, 0, ALL_GENRES);
  return allGenres;
};

export const isHydrateAction = (action: AnyAction): action is HYDRATE_ACTION_TYPE => action.type === HYDRATE ? true : false;

export const spotActiveNavClass = (activeItem: optionsMenu): string => {
  const tobeClassMovieNav = ['text', 'reviews'];

  return activeItem === 'Reviews'
    ? tobeClassMovieNav[1]
    : tobeClassMovieNav[0]
}

export const convertMinuteToTime = (time: number): string => {
  const m = time % 60;
  const h = (time - m) / 60;
  return `${Boolean(h) ? (h + 'h') : ''} ${Boolean(m) ? (m + 'm') : ''}`
};

export const devideToThree = (reviews: Reviews): Reviews[] => {
  const output: Reviews[] = [];
  for (let i = 0; i < reviews.length; i += 3) {
    const reviewSlice = reviews.slice(i, i + 3);
    output.push(reviewSlice);
  };
  return output;
};

export const PickRatingRang = (rating: number): string => {
  const Ranges = ['Bad', 'Normal', 'Awesome'];

  return rating > 3
    ? rating < 8
      ? Ranges[1]
      : Ranges[2]
    : Ranges[0];
};

export const getDate = (dateString: string): string[] => {
  const date = new Date(dateString);
  const dateTime = dateString.split('T')[0];
  return [
    dateTime,
    `${Months[date.getMonth()]} ${date.getUTCDate()}, ${date.getFullYear()}`
  ];
};


export const UpdateMoviesData = (getState: () => RootState, DATA: movieFavoriteData, data: Movie): [Movies, Movies] => {
  const basicState: basicInitialState_Interface = JSON.parse(JSON.stringify(getState().data.basic));
  const { movies, favorites_movies } = basicState;

  if (DATA.status === '1') {
    favorites_movies.push(data);
  } else {
    const favInd = favorites_movies.findIndex(movie => movie.id === data.id);
    favorites_movies.splice(favInd, 1);
  }

  movies.splice(data.id - 1, 1, data);
  return [movies, favorites_movies];
};


type inSeconds = number;
export const getNormolizeVideoTime = (current: inSeconds, duration: inSeconds): string => {
  const timeDifference = Math.trunc(duration - current);
  const h = Math.trunc(timeDifference / 3600);
  const lastSeconds = (timeDifference - (h * 3600));
  const m = Math.trunc(lastSeconds / 60);
  const s = Math.trunc(lastSeconds % 60);


  return [
    ('0' + h),
    ('0' + m).slice(-2),
    ('0' + s).slice(-2),
  ].join(':')
};

/** EventListener */
type RemoveLisener = void;
export const guardEventListener = (
  type: string,
  element: HTMLElement,
  listener: (event: Event) => void
): () => RemoveLisener => {
  if (!element) return;

  element.addEventListener(type, listener);
  return () => element.removeEventListener(type, listener);
}

/** localStorage */
export const changeOrderStage = ({ id, status }: movieFavoriteData) => {
  status === '1'
    ? setOrderFavorites({ id: id, order: id } as OrderDataObj)
    : deleteOrderFavorite(id);
};

export const changeOrderMovies = (startId: number, droppedId: number) => {
  const actual = getOrderFavorites();

  const orderStart = actual.find(obj => obj.id === startId).order;
  const orderDropped = actual.find(obj => obj.id === droppedId).order;

  actual.forEach(data => { if (data.id === startId) data.order = orderDropped });
  actual.forEach(data => { if (data.id === droppedId) data.order = orderStart });

  setOrderFav(JSON.stringify(actual));
};
