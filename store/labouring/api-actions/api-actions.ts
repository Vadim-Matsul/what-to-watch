import { Movie, Movies } from '../../../types/movies';
import { ACTIONS } from '../actions/actions';
import { AsyncThunkResult } from '../../store.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { API_NAMES, HTTP } from '../../../helpers/const/const';
import { setMovieCover } from '../../reducers/data-reducer/basic-slice/basic-slice';
import { Reviews } from '../../../types/reviews';
import { LoginData, UserData } from '../../../types/user';
import { FulfilledActionFromAsyncThunk } from '@reduxjs/toolkit/dist/matchers';

export const API_ACTIONS = {

  fetchMovies: createAsyncThunk<void, void, AsyncThunkResult>(
    API_NAMES.fetchMovies,
    async (_, { dispatch, extra }) => {
      try {
        const { data } = await extra.get<Movies>(HTTP.MOVIES);
        dispatch(ACTIONS.setMovies(data));
        dispatch(setMovieCover(data[data.length - 1]));
      } catch (err) {

      }
    }),


  fetchCurrentMovie: createAsyncThunk<any, string, AsyncThunkResult>(
    API_NAMES.fetchCurrentMovie,
    async (id, { dispatch, extra, rejectWithValue }) => {
      try {
        const { data: movie } = await extra.get<Movie>(HTTP.CURRENT_MOVIE.replace(/id/g, id));
        const { data: reviews } = await extra.get<Reviews>(HTTP.CURRENT_REVIEWS_MOVIE.replace(/id/g, id));
        dispatch(ACTIONS.setCurrentMovieReviews(reviews));
        dispatch(ACTIONS.setCurrentMovie(movie));
      } catch (err) {
        return rejectWithValue('')
      }
    }),

  checkAutorization: createAsyncThunk<void, void, AsyncThunkResult>(
    API_NAMES.checkAuthorization,
    async (_, { dispatch, extra, rejectWithValue }) => {
      try {
        const { data } = await extra.get<UserData>(HTTP.LOGIN);
        dispatch(ACTIONS.setUser(data));
        dispatch(ACTIONS.setAuthStatus('AUTH'));
      } catch (err) {
        console.log('checkAutorization catch');
        dispatch(ACTIONS.setAuthStatus('NOAUTH'));
        return rejectWithValue('')
      }
    }),

  logoutSession: createAsyncThunk<void, void, AsyncThunkResult>(
    API_NAMES.logoutSession,
    async (_, { dispatch, extra }) => {
      try {
        await extra.delete(HTTP.LOGOUT);
        dispatch(ACTIONS.setAuthStatus('NOAUTH'));
      } catch (err) {

      }
    }),

  sendUserData: createAsyncThunk<void, LoginData, AsyncThunkResult>(
    API_NAMES.sendUserData,
    async (userData, { dispatch, extra }) => {
      try {
        const { data } = await extra.post<UserData>(HTTP.LOGIN, userData);
        dispatch(ACTIONS.setUser(data));
        dispatch(ACTIONS.setAuthStatus('AUTH'));
      } catch (err) {
        dispatch(ACTIONS.setAuthStatus('NOAUTH'));
      }
    })

}


