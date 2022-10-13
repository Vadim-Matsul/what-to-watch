import { AnyAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { HYDRATE_ACTION_TYPE } from '../../store/store.types';
import { Movie, Movies } from '../../types/movies';
import { ALL_GENRES } from '../const/const';

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

export const getMoviesList = (movies: Movies): Record<string, Movie[]> => {
  const moviesList = { [ALL_GENRES]: movies };

  movies.forEach(movie => {
    movie.genre in moviesList
      ? moviesList[movie.genre].push(movie)
      : moviesList[movie.genre] = [movie]
  });

  return moviesList;
};

export const isHydrateAction = (action: AnyAction): action is HYDRATE_ACTION_TYPE => action.type === HYDRATE ? true : false;
