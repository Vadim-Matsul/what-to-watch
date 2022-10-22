import { create_mock_Data_Basic } from '../../components/z_tests-helper/store-examples';
import { createMovie, createMovies, createReviews } from '../../components/z_tests-helper/test-data';
import { RootState } from '../../store/store.types';
import { movieFavoriteData, Movies, optionsMenu } from '../../types/movies';
import { ALL_GENRES } from '../const/const';
import { convertMinuteToTime, devideToThree, getDate, getMoviesGenres, getNormolizeVideoTime, PickRatingRang, spotActiveNavClass, UpdateMoviesData } from './utils';

describe('Модуль utils', () => {

  describe('Функция getMoviesGenres', () => {

    it('корректно возвращает массив жанров', () => {
      const movies = createMovies(false, 20);
      const genres = getMoviesGenres(movies);
      expect(genres.length).not.toBe(20);
      expect(genres.shift()).toEqual(ALL_GENRES);
    });

    it('корректная обработка пустого массива', () => {
      expect(getMoviesGenres([]).length).toBe(1);
    });

  });

  describe('Функция spotActiveNavClass', () => {
    const toBeOptionsMenu: optionsMenu[] = ['Details', 'Overview', 'Reviews'];
    const tobeClassMovieNav = ['text', 'reviews'];

    it('корректно возвращает класс reviews', () => {
      expect(spotActiveNavClass(toBeOptionsMenu[2])).toBe(tobeClassMovieNav[1]);
    });

    it('корректно возвращает класс text', () => {
      expect(spotActiveNavClass(toBeOptionsMenu[0])).toBe(tobeClassMovieNav[0]);
      expect(spotActiveNavClass(toBeOptionsMenu[1])).toBe(tobeClassMovieNav[0]);
    });

  });

  describe('Функция convertMinuteToTime', () => {

    it('корректно возвращает время', () => {
      expect(convertMinuteToTime(120)).toEqual('2h ');
      expect(convertMinuteToTime(59)).toEqual(' 59m');
      expect(convertMinuteToTime(0)).toEqual(' ');
    });

  });

  describe('Функция devideToThree', () => {
    const reviews = createReviews(5);

    it('корректно разделяет исходный массив на пары максимум по 3 значения', () => {
      const res = devideToThree(reviews);
      const copy = [...res];

      expect(Array.isArray(copy.shift())).toBe(true);
      expect(res.shift().length).toBe(3);
      expect(res.pop().length).toBe(2);
    });

  });

  describe('Функция PickRatingRang', () => {
    const Ranges = ['Bad', 'Normal', 'Awesome'];

    it('корректно возвращает значение Bad', () => {
      expect(PickRatingRang(2)).toEqual(Ranges[0]);
      expect(PickRatingRang(3)).toEqual(Ranges[0]);
    });

    it('корректно возвращает значение Normal', () => {
      expect(PickRatingRang(4)).toEqual(Ranges[1]);
      expect(PickRatingRang(7)).toEqual(Ranges[1]);
    });

    it('корректно возвращает значение Awesome', () => {
      expect(PickRatingRang(10)).toEqual(Ranges[2]);
      expect(PickRatingRang(8)).toEqual(Ranges[2]);
    });

  });

  describe('Функция getDate', () => {
    const testDate = '2020-01-01T00:00:00.000Z';
    it('корректно преорбразует дату', () => {
      const res = getDate(testDate);
      expect(res[0]).toBe('2020-01-01');
      expect(res[1]).toBe('January 1, 2020');
    });
  });

  describe('Функция UpdateMoviesData', () => {
    const createStore = (favorites_movies: Movies) => (): RootState => {
      return {
        data: {
          basic: { ...create_mock_Data_Basic(favorites_movies) }
        }
      } as RootState;
    };

    it('корректно отрабатывает при status "1"', () => {
      const DATA: movieFavoriteData = { id: 8, status: '1' };
      const getState = createStore([]);
      const mockMovie = createMovie(true, 8);
      const [movies, favorites_movies] = UpdateMoviesData(getState, DATA, mockMovie);

      expect(favorites_movies.length).toBe(1);
      expect(movies[7].isFavorite).toBe(true);
    });

    it('корректно отрабатывает при status "0"', () => {
      const DATA: movieFavoriteData = { id: 8, status: '0' };
      const mockMovie = createMovie(false, 8);
      const getState = createStore([mockMovie]);
      const [movies, favorites_movies] = UpdateMoviesData(getState, DATA, mockMovie);

      expect(favorites_movies.length).toBe(0);
      expect(movies[7].isFavorite).toBe(false);
    });

  });

  describe('Функция getNormolizeVideoTime', () => {
    /**        inSeconds        */

    it('Корректное отображение времени', () => {
      expect(getNormolizeVideoTime(25, 62)).toEqual('00:00:37');
      expect(getNormolizeVideoTime(5, 66)).toEqual('00:01:01');
      expect(getNormolizeVideoTime(1, 121)).toEqual('00:02:00');
      expect(getNormolizeVideoTime(0, 3610)).toEqual('01:00:10');
      expect(getNormolizeVideoTime(0, 3660)).toEqual('01:01:00');
      expect(getNormolizeVideoTime(5, 620)).toEqual('00:10:15');
    })

  });

});
