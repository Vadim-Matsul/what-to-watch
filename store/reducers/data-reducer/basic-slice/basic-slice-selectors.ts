import { createSelector } from '@reduxjs/toolkit';
import { ALL_GENRES } from '../../../../helpers/const/const';
import { getOrderFavorites } from '../../../../services/storage';
import { Movie, Movies } from '../../../../types/movies';
import { Selector } from '../../../store.types';


export const getMovies: Selector<Movies> = (state) => state.data.basic.movies;
export const getMovieCover: Selector<Movie> = (state) => {
  const movieCopy = Object.assign<{}, Movie>({}, state.data.basic.movie_cover);
  return movieCopy;
};

export const getFavoritesMovies: Selector<Movies> = (state) => state.data.basic.favorites_movies;

export const getSortedFavoritesMovies: Selector<Movies> = (state) => {

  const currentFavorites: Movies = JSON.parse(JSON.stringify(state.data.basic.favorites_movies));
  const favoriteOrdersId = getOrderFavorites();

  favoriteOrdersId && currentFavorites.forEach((movie) => {
    favoriteOrdersId.forEach(obj => {
      if (movie.id === obj.id) movie.order = obj.order
    });
  });

  return currentFavorites.sort((a, b) => a.order > b.order ? 1 : -1);
}

export const getSortedMovies = createSelector(getMovies, movies => {
  const moviesList = { [ALL_GENRES]: movies };

  movies.forEach(movie => {
    movie.genre in moviesList
      ? moviesList[movie.genre].push(movie)
      : moviesList[movie.genre] = [movie]
  });

  return moviesList;
}) as Selector<Record<string, Movie[]>>
