import { createMovie, createMovies, createReviews } from '../../components/z_tests-helper/test-data';
import { testBundle } from '../../components/z_tests-helper/testBundle';
import { RootState } from '../../store/store.types';
import { movieFavoriteData, Movies, optionsMenu } from '../../types/movies';
import { ALL_GENRES } from '../const/const';
import { convertMinuteToTime, devideToThree, getDate, getMoviesGenres, getNormolizeVideoTime, PickRatingRang, spotActiveNavClass, UpdateMoviesData } from './utils';

const {
  storeExamples: { makeRootState }
} = testBundle;

describe('Модуль utils', () => {

  describe('Функция getMoviesGenres', () => {

    it('Корректно возвращает массив жанров', () => {
      const movies = createMovies(false, 20);
      const genres = getMoviesGenres(movies);
      expect(genres.length).not.toBe(20);
      expect(genres.shift()).toBe(ALL_GENRES);
    });

    it('Корректная обработка пустого массива', () => {
      expect(getMoviesGenres([]).length).toBe(1);
    });

  });

  describe('Функция spotActiveNavClass', () => {
    const toBeOptionsMenu: optionsMenu[] = ['Details', 'Overview', 'Reviews'];
    const tobeClassMovieNav = ['text', 'reviews'];

    it('Корректно возвращает класс reviews', () => {
      expect(spotActiveNavClass(toBeOptionsMenu[2])).toBe(tobeClassMovieNav[1]);
    });

    it('Корректно возвращает класс text', () => {
      expect(spotActiveNavClass(toBeOptionsMenu[0])).toBe(tobeClassMovieNav[0]);
      expect(spotActiveNavClass(toBeOptionsMenu[1])).toBe(tobeClassMovieNav[0]);
    });

  });

  describe('Функция convertMinuteToTime', () => {

    it('Корректно возвращает время', () => {
      expect(convertMinuteToTime(120)).toBe('2h ');
      expect(convertMinuteToTime(59)).toBe(' 59m');
      expect(convertMinuteToTime(0)).toBe(' ');
    });

  });

  describe('Функция devideToThree', () => {
    const reviews = createReviews(5);

    it('Корректно разделяет исходный массив на пары максимум по 3 значения', () => {
      const res = devideToThree(reviews);
      const copy = [...res];

      expect(Array.isArray(copy.shift())).toBe(true);
      expect(res.shift()!.length).toBe(3);
      expect(res.pop()!.length).toBe(2);
    });

  });

  describe('Функция PickRatingRang', () => {
    const Ranges = ['Bad', 'Normal', 'Awesome'];

    it('Корректно возвращает значение Bad', () => {
      expect(PickRatingRang(2)).toBe(Ranges[0]);
      expect(PickRatingRang(3)).toBe(Ranges[0]);
    });

    it('Корректно возвращает значение Normal', () => {
      expect(PickRatingRang(4)).toBe(Ranges[1]);
      expect(PickRatingRang(7)).toBe(Ranges[1]);
    });

    it('Корректно возвращает значение Awesome', () => {
      expect(PickRatingRang(10)).toBe(Ranges[2]);
      expect(PickRatingRang(8)).toBe(Ranges[2]);
    });

  });

  describe('Функция getDate', () => {
    const testDate = '2020-01-01T00:00:00.000Z';
    it('Корректно преорбразует дату', () => {
      const res = getDate(testDate);
      expect(res[0]).toBe('2020-01-01');
      expect(res[1]).toBe('January 1, 2020');
    });

    it('Число месяца правильно отображается', () => {
      const mockGetDate = jest.spyOn(Date.prototype, 'getUTCDate');
      getDate(testDate);
      expect(mockGetDate).toBeCalledTimes(1);
    });

  });

  describe('Функция UpdateMoviesData', () => {

    afterEach(() => jest.restoreAllMocks());

    const createStore = (favorites: Movies) => (): RootState => {
      return {
        ...makeRootState({ favorites_movies: favorites })
      };
    };

    it('Корректно отрабатывает при status "1"', () => {
      const DATA: movieFavoriteData = { id: 8, status: '1' };
      const getState = createStore([]);
      const mockMovie = createMovie(true, 8);

      const [jsonParseMock, jsonStringifyMock] = [jest.spyOn(JSON, 'parse'), jest.spyOn(JSON, 'stringify')];
      const spliceMock = jest.spyOn(Array.prototype, 'splice');

      const [movies, favorites_movies] = UpdateMoviesData(getState, DATA, mockMovie);

      expect(jsonParseMock).toBeCalled();
      expect(jsonStringifyMock).toBeCalled();
      expect(spliceMock).toBeCalledTimes(1);
      expect(favorites_movies.length).toBe(1);
      console.log('status "1"', movies);

      expect(movies[0].isFavorite).toBe(true);
    });

    it('Корректно отрабатывает при status "0"', () => {
      const DATA: movieFavoriteData = { id: 8, status: '0' };
      const mockMovie = createMovie(false, 8);
      const getState = createStore([mockMovie]);

      const spliceMock = jest.spyOn(Array.prototype, 'splice');
      const [jsonParseMock, jsonStringifyMock] = [jest.spyOn(JSON, 'parse'), jest.spyOn(JSON, 'stringify')];

      const [movies, favorites_movies] = UpdateMoviesData(getState, DATA, mockMovie);

      expect(spliceMock).toBeCalledTimes(2);
      expect(jsonParseMock).toBeCalled();
      expect(jsonStringifyMock).toBeCalled();
      expect(favorites_movies).toEqual([]);
      console.log('status "0"', movies);
      expect(movies[0].isFavorite).toBe(false);
    });

  });

  describe('Функция getNormolizeVideoTime', () => {
    /**        inSeconds        */

    it('Корректное отображение времени', () => {
      expect(getNormolizeVideoTime(25, 62)).toBe('00:00:37');
      expect(getNormolizeVideoTime(5, 66)).toBe('00:01:01');
      expect(getNormolizeVideoTime(1, 121)).toBe('00:02:00');
      expect(getNormolizeVideoTime(0, 3610)).toBe('01:00:10');
      expect(getNormolizeVideoTime(0, 3660)).toBe('01:01:00');
      expect(getNormolizeVideoTime(5, 620)).toBe('00:10:15');
    });

    it('Логика функции не сломана', () => {
      const roundUp = jest.spyOn(Math, 'trunc');
      getNormolizeVideoTime(65, 99);
      expect(roundUp).toBeCalledTimes(4);
    });

  });

});
