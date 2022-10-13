import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { Movies } from '../../../../types/movies';
import { Selector } from '../../../store.types';
import { getActiveGenre } from '../../app-reducer/app-slice-selectors';



export const getMovies: Selector<Movies> = (state) => state.data.basic.movies;

// export const getSortedMovies = createSelector(getMovies, getActiveGenre, (movies, genre) => {
//   const moviesList = {}
// });
