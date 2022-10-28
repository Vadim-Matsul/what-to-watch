import { testBundle } from '../../../../components/z_tests-helper/testBundle';
import { getBasicStatus, getFavoritesMovies, getMovieCover, getMovies, getSortedFavoritesMovies, getSortedMovies } from '../../index.selectors';
import * as STORAGE from '../../../../services/storage';
import { OrderData } from '../../../../types/movies';
import { ALL_GENRES } from '../../../../helpers/const/const';

const {
  faker,
  creators: { createMovie, createMovies, },
  storeExamples: { makeRootState },
} = testBundle;

jest.mock('../../../../services/storage', () => ({
  __esModule: true,
  ...jest.requireActual('../../../../services/storage'),
}));

describe('Selectors: basic-slice', () => {
  const state = makeRootState();

  it('getMovies', () => {
    const res = getMovies(state);
    expect(Array.isArray(res)).toBeTruthy();
  });

  it('getFavoritesMovies', () => {
    const res = getFavoritesMovies(state);
    expect(Array.isArray(res)).toBeTruthy();
  });

  it('getBasicStatus', () => {
    const res = getBasicStatus(state);
    expect(res).toBe('none');

    const res$ = getBasicStatus(makeRootState({ status: 'pending' }));
    expect(res$).toBeTruthy();

    const res$$ = getBasicStatus(makeRootState({ status: 'fulfilled' }));
    expect(res$$).toBe('fulfilled');

    const res$$$ = getBasicStatus(makeRootState({ status: 'rejected' }));
    expect(res$$$).toBe('rejected');

    expect(typeof res).toBe('string');
    expect(typeof res$$).toBe('string');
    expect(typeof res$$$).toBe('string');
  });

  it('getMovieCover', () => {
    const res = getMovieCover(state);
    expect(res).not.toBeNull();
    expect(typeof res).toBe('object')

    const res$ = getMovieCover(makeRootState({ movie_cover: createMovie() }));
    expect(typeof res$).toBe('object');
  });

  describe('getSortedFavoritesMovies', () => {

    afterEach(() => jest.clearAllMocks());

    it('Выполняются все методы', () => {
      const spyFavSTORAGE = jest
        .spyOn(STORAGE, 'getOrderFavorites')
        .mockImplementation(() => []);
      const spyJSONparse = jest.spyOn(JSON, 'parse');
      const spyJSONstringify = jest.spyOn(JSON, 'stringify');
      const spySortMethod = jest.spyOn(Array.prototype, 'sort');

      getSortedFavoritesMovies(state);

      expect(spyFavSTORAGE).toBeCalledTimes(1);
      expect(spyJSONparse).toBeCalledTimes(1);
      expect(spyJSONstringify).toBeCalledTimes(1);
      expect(spySortMethod).toBeCalledTimes(1);
    });

    it('Успешно меняется порядок фильмов', () => {
      // хранится в state
      const favMovie = createMovie(true); favMovie.order = 1;
      // хранится в storage 
      const fakeOrderData: OrderData = [{ id: favMovie.id, order: 2 }];
      const state = makeRootState({ favorites_movies: [favMovie] });

      jest
        .spyOn(STORAGE, 'getOrderFavorites')
        .mockImplementation(() => fakeOrderData);

      const [replacedOrderMovie] = getSortedFavoritesMovies(state);

      expect(replacedOrderMovie.order).toBe(2);
    });

    it('Успешно не меняется порядок фильмов', () => {
      const favMovie = createMovie(true); favMovie.order = 1;
      const fakeOrderData: OrderData = [{ id: faker.datatype.number(), order: 2 }];
      const state = makeRootState({ favorites_movies: [favMovie] });

      jest
        .spyOn(STORAGE, 'getOrderFavorites')
        .mockImplementation(() => fakeOrderData);

      const [replacedOrderMovie] = getSortedFavoritesMovies(state);

      expect(replacedOrderMovie.order).toBe(1);
    });

  });

  it('getSortedMovies', () => {
    const movies = createMovies(false, 10);
    const state = makeRootState({ movies });
    const res = getSortedMovies(state);

    const beKeys = Object.keys(res);

    expect(beKeys[0]).toBe(ALL_GENRES);
    expect(beKeys.length).toBeGreaterThan(5);
    expect(res[ALL_GENRES]).toEqual(movies);
  });

});
