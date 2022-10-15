import { AnyAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { HYDRATE_ACTION_TYPE } from '../../store/store.types';
import { Movie, Movies, optionsMenu } from '../../types/movies';
import { Reviews } from '../../types/reviews';
import { ALL_GENRES, Months } from '../const/const';

export const constrictType = <T extends string>(type: T) => type;

export const getStringForImg = (str: string): string => str.toLowerCase().replace(/\s/g, '-');

export const getMoviesGenres = (movies: Movies): string[] => {
  const allGenres = Array.from(
    new Set(
      movies.map(movie => movie.genre)
    )
  ).sort();
  allGenres.splice(0, 0, ALL_GENRES);
  return allGenres;
}

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
  return `${h}h ${m && m + 'm'}`
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
