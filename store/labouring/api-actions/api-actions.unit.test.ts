import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosInstance } from 'axios';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createMovie, createMovies, createReview, createReviews, generateRandomId } from '../../../components/z_tests-helper/test-data';
import { HTTP } from '../../../helpers/const/const';
import { API_ACTIONS } from './api-actions';
import http from 'axios'
import { CurrentMovie_Fulfilled } from '../../reducers/data-reducer/current-slice/current-types';
import { isAsyncDispatch } from '../../store.types';


type ThunkDispatchResult = ThunkDispatch<{}, AxiosInstance, Action>
const makeStore = configureMockStore<{}, Action, ThunkDispatchResult>([thunk.withExtraArgument(axios)]);

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;


describe('Module API_ACTIONS', () => {

  // При каждом test-case создаём новый store,
  // чтобы массив actions был актуален для каждого test-case
  let mockStore: ReturnType<typeof makeStore>;
  beforeEach(() => {
    mockStore = makeStore({});
  })

  afterEach(() => jest.clearAllMocks());


  describe('fetchMovies', () => {

    afterEach(() => jest.resetAllMocks());

    it('Выполняются все actions', async () => {
      const fakeMovies = createMovies(false, 5);
      mockAxios.get.mockImplementationOnce(() => (Promise.resolve({ data: fakeMovies })));

      await mockStore.dispatch(API_ACTIONS.fetchMovies());

      const actionsArr = mockStore.getActions();
      const Action_BasicSetMovies = actionsArr.find(action => action.type === 'basic/setMovies') as PayloadAction;
      const Action_BasicSetMovieCover = actionsArr.find(action => action.type === 'basic/setMovieCover') as PayloadAction;

      expect(Action_BasicSetMovies.payload).toEqual(fakeMovies);
      expect(Action_BasicSetMovieCover.payload).toBeInstanceOf(Object);
    });

    it('выполняется запрос', async () => {
      const axiosSpy = jest.spyOn<AxiosInstance, 'get'>(axios, 'get').mockResolvedValue({ data: 'test' });
      await mockStore.dispatch(API_ACTIONS.fetchMovies());

      expect(axiosSpy).toBeCalledWith(HTTP.MOVIES);
    });

  });

  describe('fetchCurrentMovie', () => {
    // очищаем моки после каждого теста
    afterEach(() => {
      jest.resetAllMocks();
      jest.clearAllMocks();
    });

    it('успешно возвращаются данные и выполняются все actions', async () => {
      const fake_movie = createMovie();
      const fake_review = createReview();
      const testId = generateRandomId(true) as string;

      // имитируем реализацую запроса к серверу с помощью mockImplementation
      mockAxios.get.mockImplementation(url => {
        if (url.startsWith(HTTP.CURRENT_MOVIE.split('/')[0])) {
          return Promise.resolve({ data: fake_movie });
        }
        if (url.startsWith(HTTP.CURRENT_REVIEWS_MOVIE.split('/')[0])) {
          return Promise.resolve({ data: fake_review });
        }
      });

      const { payload: [movie, review] } = await mockStore.dispatch(API_ACTIONS.fetchCurrentMovie(testId)) as CurrentMovie_Fulfilled;
      const actions = mockStore.getActions();
      const Action_SetCurrentMovieReviews = actions.find(action => action.type === 'current/setCurrentMovieReviews') as PayloadAction;
      const Action_SetCurrentMovie = actions.find(action => action.type === 'current/setCurrentMovie') as PayloadAction;


      expect(movie).toEqual(fake_movie);
      expect(review).toEqual(fake_review);
      expect(Action_SetCurrentMovie.payload).toEqual(fake_movie);
      expect(Action_SetCurrentMovieReviews.payload).toEqual(fake_review);
    });

    it('выполняется запрос фильма и комментаиев', async () => {
      // устанавливаем `шпиона` на get запрос
      // чтобы проселдить с какими аргументами вызывался и сколько раз
      const axiosSpy = jest.spyOn(axios, 'get').mockResolvedValue({ data: 'test' });

      const testId = generateRandomId(true) as string;
      const reqRouteM = HTTP.CURRENT_MOVIE.replace(/id/g, testId);
      const reqRouteR = HTTP.CURRENT_REVIEWS_MOVIE.replace(/id/g, testId);

      await mockStore.dispatch(API_ACTIONS.fetchCurrentMovie(testId));

      expect(axiosSpy).toBeCalledTimes(2);
      expect(axiosSpy).toBeCalledWith(reqRouteM);
      expect(axiosSpy).toBeCalledWith(reqRouteR);
    });

    it('данные не возвращаются при ошибке', async () => {
      const testId = generateRandomId(true) as string;
      const axiosSpy = jest.spyOn(axios, 'get').mockRejectedValue('');

      const { payload } = await mockStore.dispatch(API_ACTIONS.fetchCurrentMovie(testId));

      expect(axiosSpy).toBeCalledTimes(1);
      expect(payload).not.toBeInstanceOf(Array);
    });

  });

  describe('fetchFavorites', () => {

    it('Корректно выполняется запрос', () => {
      const axiosHunter = jest.spyOn(axios, 'get');
      mockStore.dispatch(API_ACTIONS.fetchFavorites());

      expect(axiosHunter).toBeCalledTimes(1);
      expect(axiosHunter).toBeCalledWith(HTTP.FAVORITES);
    });

    it('Action с правильным payload', async () => {
      const fakeFavoritesMovies = createMovies(true, 5);
      const axiosSpy = jest.spyOn(axios, 'get').mockResolvedValue({ data: fakeFavoritesMovies });

      await mockStore.dispatch(API_ACTIONS.fetchFavorites());
      const actions = mockStore.getActions();
      const Action_SetFavoritesMovies = actions.find(action => action.type === 'basic/setFavoritesMovies') as PayloadAction;

      expect(axiosSpy).not.toBeCalledTimes(0);
      expect(Action_SetFavoritesMovies.payload).toEqual(fakeFavoritesMovies);
    });

    it('При ошибке action не вызывается', async () => {
      mockAxios.get.mockRejectedValueOnce({ data: 'testFavorites' });

      await mockStore.dispatch(API_ACTIONS.fetchFavorites());
      const action = mockStore.getActions()
      const Action_FetchFavoritesRejected = action[1];

      // ожидаем, что пройдут 2 action - basic/fetchFavorites/pending и basic/fetchFavorites/rejected;
      expect(action.length).toBe(2);
      expect(Action_FetchFavoritesRejected.type).toBe('basic/fetchFavorites/rejected');
    });

  });


});
