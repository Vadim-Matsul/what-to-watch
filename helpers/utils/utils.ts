import { Movies } from '../../types/types';
import { ALL_GENRES } from '../const/const';

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

