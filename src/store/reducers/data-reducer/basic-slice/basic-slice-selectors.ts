import { createSelector } from '@reduxjs/toolkit';

import { getOrderFavorites } from '../../../../services/storage';
import { ALL_GENRES } from '../../../../helpers/const/const';
import { Movie, Movies } from '../../../../types/movies';
import { Status } from '../../../../types/user';
import { Selector } from '../../../store.types';


export const getMovies: Selector<Movies> = (state) => state.data.basic.movies;
export const getFavoritesMovies: Selector<Movies> = (state) => state.data.basic.favorites_movies;
export const getBasicStatus: Selector<Status> = (state) => state.data.basic.status;


export const getMovieCover: Selector<Movie> = (state) =>
  Object.assign<{}, Movie>({}, state.data.basic.movie_cover!);


export const getSortedFavoritesMovies: Selector<Movies> = (state) => {

  const currentFavorites: Movies = JSON.parse(JSON.stringify(state.data.basic.favorites_movies));
  const favoriteOrdersId = getOrderFavorites();

  favoriteOrdersId && currentFavorites.forEach((movie) => {
    favoriteOrdersId.forEach(obj => {
      if (movie.id === obj.id) movie.order = obj.order;
    });
  });

  return currentFavorites.sort((a, b) => a.order! > b.order! ? 1 : -1);
};

export const getSortedMovies = createSelector(getMovies, movies => {
  const moviesList: Record<string, Movies> = { [ALL_GENRES]: movies };

  movies.forEach(movie => {
    movie.genre in moviesList
      ? moviesList[movie.genre].push(movie)
      : moviesList[movie.genre] = [movie];
  });

  return moviesList;
}) as Selector<Record<string, Movie[]>>;
