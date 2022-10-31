import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { setMovieCover } from '../../reducers/data-reducer/basic-slice/basic-slice';
import { changeOrderStage, UpdateMoviesData } from '../../../helpers/utils/utils';
import { API_NAMES, HTTP, ToastConfig } from '../../../helpers/const/const';
import { Movie, movieFavoriteData, Movies } from '../../../types/movies';
import { ReviewFormData, Reviews } from '../../../types/reviews';
import { LoginData, UserData } from '../../../types/user';
import { AsyncThunkResult } from '../../store.types';
import { ACTIONS } from '../actions/actions';


export const API_ACTIONS = {

  fetchMovies: createAsyncThunk<void, void, AsyncThunkResult>(
    API_NAMES.fetchMovies,
    async (_, { dispatch, extra }) => {
      try {
        const { data } = await extra.get<Movies>(HTTP.MOVIES);
        dispatch(ACTIONS.setMovies(data));
        dispatch(setMovieCover(data[data.length - 1]));
      } catch (err) { }
    }),

  fetchCurrentMovie: createAsyncThunk<[Movie, Reviews], string, AsyncThunkResult>(
    API_NAMES.fetchCurrentMovie,
    async (id, { dispatch, extra, rejectWithValue }) => {
      try {
        const { data: movie } = await extra.get<Movie>(HTTP.CURRENT_MOVIE.replace(/id/g, id));
        const { data: reviews } = await extra.get<Reviews>(HTTP.CURRENT_REVIEWS_MOVIE.replace(/id/g, id));
        dispatch(ACTIONS.setCurrentMovieReviews(reviews));
        dispatch(ACTIONS.setCurrentMovie(movie));
        return [movie, reviews];
      } catch (err) {
        return rejectWithValue('');
      }
    }),

  fetchFavorites: createAsyncThunk<void, void, AsyncThunkResult>(
    API_NAMES.fetchFavorites,
    async (_, { dispatch, extra, rejectWithValue }) => {
      try {
        const { data } = await extra.get<Movies>(HTTP.FAVORITES);
        dispatch(ACTIONS.setFavoritesMovies(data));
      } catch (err) {
        return rejectWithValue('');
      }
    }
  ),

  changeFavorites: createAsyncThunk<void, movieFavoriteData, AsyncThunkResult>(
    API_NAMES.changeFavorites,
    async (DATA, { dispatch, extra, getState }) => {
      toast.dismiss();
      const Id = toast(ToastConfig.toastWait, { type: 'info', autoClose: 6000 });

      try {
        const { data } = await extra.post<Movie>(HTTP.FAVORITES + `/${DATA.id}/` + DATA.status);
        changeOrderStage(DATA);
        const [movies, favMovies] = UpdateMoviesData(getState, DATA, data);

        dispatch(ACTIONS.setMovies(movies));
        dispatch(ACTIONS.setFavoritesMovies(favMovies));

        DATA.status === '1'
          ? toast.update(Id, { render: ToastConfig.s_addedToFav, type: 'success', autoClose: 2000 })
          : toast.update(Id, { render: ToastConfig.s_removedFromFav, type: 'success', autoClose: 2000 });

      } catch (err) {
        toast.update(Id, { render: ToastConfig.r_error, type: 'error', autoClose: false })
      }
    }
  ),

  checkAutorization: createAsyncThunk<void, void, AsyncThunkResult>(
    API_NAMES.checkAuthorization,
    async (_, { dispatch, extra, rejectWithValue, getState }) => {
      let Id: number | string;
      if (getState().user.status === 'none') {
        toast.dismiss();
        Id = toast(ToastConfig.toastWait, { autoClose: 6000 });
      }

      try {
        const { data } = await extra.get<UserData>(HTTP.LOGIN);

        toast.update(Id!, { render: ToastConfig.welcome + data.name, type: 'success', autoClose: 2000 });

        dispatch(ACTIONS.setUser(data));
        dispatch(ACTIONS.setAuthStatus('AUTH'));
      } catch (err) {
        toast.update(Id!, { render: ToastConfig.sh_login, type: 'default', autoClose: 2000 });

        dispatch(ACTIONS.setAuthStatus('NOAUTH'));
        return rejectWithValue('')
      }
    }),

  logoutSession: createAsyncThunk<void, void, AsyncThunkResult>(
    API_NAMES.logoutSession,
    async (_, { dispatch, extra }) => {
      let Id = toast(ToastConfig.toastWait, { autoClose: 6000 });
      try {
        await extra.delete(HTTP.LOGOUT);

        toast.update(Id, { render: ToastConfig.s_logout, type: 'success', autoClose: 2000 });

        dispatch(ACTIONS.setAuthStatus('NOAUTH'));
        dispatch(ACTIONS.setFavoritesMovies([]));
      } catch (err) {
        toast.update(Id, { render: ToastConfig.r_error, type: 'error' });
      }
    }),

  sendUserData: createAsyncThunk<void, LoginData, AsyncThunkResult>(
    API_NAMES.sendUserData,
    async (userData, { dispatch, extra }) => {
      try {
        const { data } = await extra.post<UserData>(HTTP.LOGIN, userData);

        toast.success(ToastConfig.s_authForm);

        dispatch(ACTIONS.setUser(data));
        dispatch(ACTIONS.setAuthStatus('AUTH'));
        dispatch(ACTIONS.setStatusUser('fulfilled'));
      } catch (err) {
        toast.error(ToastConfig.r_error)
        dispatch(ACTIONS.setAuthStatus('NOAUTH'));
        dispatch(ACTIONS.setStatusUser('rejected'));
      }
    }),

  postMovieReview: createAsyncThunk<void, ReviewFormData, AsyncThunkResult>(
    API_NAMES.postMovieReview,
    async (data, { dispatch, extra }) => {
      let Id = toast(ToastConfig.toastWait, { autoClose: 6000 });
      try {
        await extra.post(HTTP.CURRENT_REVIEWS_MOVIE.replace(/id/g, String(data.id)), {
          comment: data.comment,
          rating: data.rating
        });
        toast.update(Id, { render: ToastConfig.s_commentSubmit, type: 'success', autoClose: 2000 });
        dispatch(ACTIONS.setActiveMovieItem('Reviews'));
      } catch (err) {
        toast.update(Id, { render: ToastConfig.r_error, type: 'error', autoClose: false });
      }
    }
  )
};
