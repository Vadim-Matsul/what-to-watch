import axios, { AxiosInstance } from 'axios';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action, PayloadAction } from '@reduxjs/toolkit';
import { configureMockStore } from '@jedmao/redux-mock-store';

import { CurrentMovie_Fulfilled } from '../../reducers/data-reducer/current-slice/current-types';
import { testBundle } from '../../../components/z_tests-helper/testBundle';
import * as changeFavUtils from '../../../helpers/utils/utils';
import { movieFavoriteData } from '../../../types/movies';
import { LoginData, UserData } from '../../../types/user';
import { HTTP } from '../../../helpers/const/const';
import { RootState } from '../../store.types';
import { API_ACTIONS } from './api-actions';


jest.mock('axios');
type ThunkDispatchResult = ThunkDispatch<RootState, AxiosInstance, Action>;
const makeStore = configureMockStore<RootState, PayloadAction, ThunkDispatchResult>([thunk.withExtraArgument(axios)]);

const mockAxios = axios as jest.Mocked<typeof axios>;


/**
 * Чтобы jest смог переопределить экспорт модуля, 
 *       указываем __esModule: true, который присваивает configurable: true ( по умолчанию false )
 *                                                                       /\
 * Например, альтернатива этого действия:                                |
 *  Object.defineProperty( someObj, 'some key', {                        |
 *    enumarable: true,                                                  |
 *    writable: true,                                                    |
 *    configurable: false   --->   jest не сможет замокать, пока не переопределим на true;
 *  })
 */
jest.mock('../../../helpers/utils/utils', () => ({
  __esModule: true,
  ...jest.requireActual('../../../helpers/utils/utils')
}));


const {
  creators: {
    createFakeReviewData,
    createFakeLoginData,
    createRandomId,
    createFakeUser,
    createMovies,
    createReview,
    createMovie,
  }
} = testBundle;


describe('Module API_ACTIONS', () => {

  // При каждом test-case создаём новый store,
  // чтобы массив actions был актуален для каждого test-case
  let mockStore: ReturnType<typeof makeStore>;
  beforeEach(() => {
    mockStore = makeStore({});
  });

  afterEach(() => jest.clearAllMocks());

  describe('fetchMovies', () => {

    afterEach(() => jest.resetAllMocks());

    it('Выполняются все actions', async () => {
      const fakeMovies = createMovies(false, 5);
      mockAxios.get.mockImplementationOnce(() => (Promise.resolve({ data: fakeMovies })));

      await mockStore.dispatch(API_ACTIONS.fetchMovies());
      const actionsArr = mockStore.getActions();

      expect(actionsArr.find(a => a.type === 'basic/setMovies')!.payload).toEqual(fakeMovies);
      expect(actionsArr.find(a => a.type === 'basic/setMovieCover')!.payload).toBeInstanceOf(Object);
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
      const testId = createRandomId(true) as string;

      // имитируем реализацую запроса к серверу с помощью mockImplementation
      mockAxios.get.mockImplementation((url) => {
        if (url.startsWith(HTTP.CURRENT_MOVIE.split('/')[0])) {
          return Promise.resolve({ data: fake_movie });
        }
        if (url.startsWith(HTTP.CURRENT_REVIEWS_MOVIE.split('/')[0])) {
          return Promise.resolve({ data: fake_review });
        }
        return Promise.resolve();
      });

      const { payload: [movie, review] } = await mockStore.dispatch(API_ACTIONS.fetchCurrentMovie(testId)) as CurrentMovie_Fulfilled;
      const actions = mockStore.getActions();

      expect(movie).toEqual(fake_movie);
      expect(review).toEqual(fake_review);
      expect(actions.find(a => a.type === 'current/setCurrentMovie')!.payload).toEqual(fake_movie);
      expect(actions.find(a => a.type === 'current/setCurrentMovieReviews')!.payload).toEqual(fake_review);
    });

    it('выполняется запрос фильма и комментаиев', async () => {
      // устанавливаем `шпиона` на get запрос
      // чтобы проселдить с какими аргументами вызывался и сколько раз
      const axiosSpy = jest.spyOn(axios, 'get').mockResolvedValue({ data: 'test' });

      const testId = createRandomId(true) as string;
      const reqRouteM = HTTP.CURRENT_MOVIE.replace(/id/g, testId);
      const reqRouteR = HTTP.CURRENT_REVIEWS_MOVIE.replace(/id/g, testId);

      await mockStore.dispatch(API_ACTIONS.fetchCurrentMovie(testId));

      expect(axiosSpy).toBeCalledTimes(2);
      expect(axiosSpy).toBeCalledWith(reqRouteM);
      expect(axiosSpy).toBeCalledWith(reqRouteR);
    });

    it('данные не возвращаются при ошибке', async () => {
      const testId = createRandomId(true) as string;
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

      expect(axiosSpy).not.toBeCalledTimes(0);
      expect(actions.find(a => a.type === 'basic/setFavoritesMovies')!.payload).toEqual(fakeFavoritesMovies);
    });

    it('При ошибке action не вызывается', async () => {
      mockAxios.get.mockRejectedValueOnce({ data: 'testFavorites' });

      await mockStore.dispatch(API_ACTIONS.fetchFavorites());
      const action = mockStore.getActions();
      const Action_FetchFavoritesRejected = action[1];

      // ожидаем, что пройдут 2 action - basic/fetchFavorites/pending и basic/fetchFavorites/rejected;
      expect(action.length).toBe(2);
      expect(Action_FetchFavoritesRejected.type).toBe('basic/fetchFavorites/rejected');
    });

  });

  describe('changeFavorites', () => {
    const getDATA: (status: string) => movieFavoriteData = (status: string) => ({ id: 5, status: status });
    const getRoute = (DATA: movieFavoriteData): string => HTTP.FAVORITES + `/${DATA.id}/` + DATA.status;

    it('Выполняется правильный запрос', async () => {
      const DATA_1 = getDATA('1'); const route_1 = getRoute(DATA_1);
      const DATA_0 = getDATA('0'); const route_0 = getRoute(DATA_0);
      const axiosSpy = jest.spyOn(axios, 'post');

      await mockStore.dispatch(API_ACTIONS.changeFavorites(DATA_1));
      await mockStore.dispatch(API_ACTIONS.changeFavorites(DATA_0));

      expect(axiosSpy).toBeCalledWith(route_1);
      expect(axiosSpy).toBeCalledWith(route_0);
    });

    it('Все actions и utils вызываются', async () => {
      const fake_Movies = createMovies(false, 3);
      const fake_FMovies = createMovies(true, 3);

      const spyChangeOrderStage = jest.spyOn(changeFavUtils, 'changeOrderStage').mockReturnValueOnce();
      const spyUpdateMoviesData = jest
        .spyOn(changeFavUtils, 'UpdateMoviesData')
        .mockImplementationOnce(() => ([fake_Movies, fake_FMovies]));
      mockAxios.post.mockResolvedValueOnce({ data: 'test' });

      await mockStore.dispatch(API_ACTIONS.changeFavorites('test' as unknown as movieFavoriteData));
      const actions = mockStore.getActions();

      expect(spyChangeOrderStage).toBeCalledTimes(1);
      expect(spyUpdateMoviesData).toBeCalledTimes(1);
      expect(actions.find(a => a.type === 'basic/setMovies')!.payload).toEqual(fake_Movies);
      expect(actions.find(a => a.type === 'basic/setFavoritesMovies')!.payload).toEqual(fake_FMovies);
    });

  });

  describe('checkAutorization', () => {
    let mockStore: ReturnType<typeof makeStore>;
    beforeEach(() => {
      mockStore = makeStore({ user: { status: 'fulfilled' } });
    });


    it('Корректный url запроса', async () => {
      const axiosSpy = jest.spyOn(axios, 'get');
      await mockStore.dispatch(API_ACTIONS.checkAutorization());

      expect(axiosSpy).toBeCalledWith(HTTP.LOGIN);
    });

    it('Выполняются все actions при fulfilled', async () => {
      const fakeUser = createFakeUser();
      mockAxios.get.mockResolvedValue({ data: fakeUser });

      await mockStore.dispatch(API_ACTIONS.checkAutorization());
      const actions = mockStore.getActions();

      expect(actions.find(a => a.type === 'user/setUser')!.payload).toEqual(fakeUser);
      expect(actions.find(a => a.type === 'user/setAuthStatus')!.payload).toBe('AUTH');

      mockAxios.get.mockReset();
    });

    it('Выполняются все actions при rejected', async () => {
      mockAxios.get.mockRejectedValue('test');
      await mockStore.dispatch(API_ACTIONS.checkAutorization());

      expect(mockStore.getActions().find(a => a.type === 'user/setAuthStatus')!.payload).toBe('NOAUTH');
    });

  });

  describe('logoutSession', () => {

    it('Корректный url запроса', async () => {
      const axiosDeleteSpy = jest.spyOn(axios, 'delete');
      await mockStore.dispatch(API_ACTIONS.logoutSession());

      expect(axiosDeleteSpy).toBeCalledWith(HTTP.LOGOUT);
    });

    it('Вызвались все actions', async () => {
      mockAxios.delete.mockImplementation(() => (Promise.resolve()));

      await mockStore.dispatch(API_ACTIONS.logoutSession());
      const actions = mockStore.getActions();

      expect(actions.find(a => a.type === 'user/setAuthStatus')!.payload).toBe('NOAUTH');
      expect(actions.find(a => a.type === 'basic/setFavoritesMovies')!.payload).toEqual([]);
    });

  });

  describe('sendUserData', () => {

    it('корректный адрес запроса', async () => {
      const axiosSpy = jest.spyOn(axios, 'post');
      // не передаём userData т.к в тест-кейсе важно убедиться по какому url прошёл запрос
      await mockStore.dispatch(API_ACTIONS.sendUserData('' as unknown as LoginData));
      expect(axiosSpy).toBeCalledWith(HTTP.LOGIN, '');
    });

    it('Выполняются все actions при fulfilled', async () => {
      const fake_LoginData = createFakeLoginData();
      const fake_UserData: Partial<UserData> = createFakeUser();
      delete fake_UserData.email;
      Object.defineProperty(fake_UserData, 'email', {
        value: fake_LoginData.email,
        enumerable: true,
      });

      mockAxios.post.mockResolvedValueOnce({ data: fake_UserData });
      await mockStore.dispatch(API_ACTIONS.sendUserData(fake_LoginData));
      const actions = mockStore.getActions();

      expect(actions.find(a => a.type === 'user/setUser')!.payload).toEqual(fake_UserData);
      expect(actions.find(a => a.type === 'user/setAuthStatus')!.payload).toEqual('AUTH');
      expect(actions.find(a => a.type === 'user/setStatusUser')!.payload).toEqual('fulfilled');
    });

    it('Выполняются все actions при rejected', async () => {
      mockAxios.post.mockRejectedValueOnce({ data: '' });
      await mockStore.dispatch(API_ACTIONS.sendUserData('' as unknown as LoginData));
      const actions = mockStore.getActions();

      expect(actions.find(a => a.type === 'user/setAuthStatus')!.payload).toEqual('NOAUTH');
      expect(actions.find(a => a.type === 'user/setStatusUser')!.payload).toEqual('rejected');
    });

  });

  describe('postMovieReview', () => {
    const fake_ReviewData = createFakeReviewData();
    const toBePath = HTTP.CURRENT_REVIEWS_MOVIE.replace(/id/g, fake_ReviewData.id!.toString());

    it('Корректный url запроса', async () => {
      const axiosSpy = jest.spyOn(axios, 'post');
      await mockStore.dispatch(API_ACTIONS.postMovieReview(fake_ReviewData));
      delete fake_ReviewData.id;
      expect(axiosSpy).toBeCalledWith(toBePath, fake_ReviewData);
    });

    it('Выполняются все actions', async () => {
      mockAxios.post.mockImplementation(() => (Promise.resolve()));
      await mockStore.dispatch(API_ACTIONS.postMovieReview(fake_ReviewData));
      expect(mockStore.getActions().find(a => a.type === 'app/setActiveMovieItem')!.payload).toBe('Reviews');
    });

  });

});
