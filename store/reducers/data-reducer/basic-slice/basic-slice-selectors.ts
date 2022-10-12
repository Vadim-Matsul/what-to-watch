import { createSelector } from '@reduxjs/toolkit';
import { Movies } from '../../../../types/types';
import { RootState } from '../../../store.types';

type selector<R = any, S = RootState> = (state: S) => R

export const getMovies: selector<Movies> = (state) => state.data.basic.movies
