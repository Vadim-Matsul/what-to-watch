import { AnyAction } from '@reduxjs/toolkit';
import { bePagesPaths } from '../../helpers/const/const';
import { movieFavoriteData } from '../../types/movies';
import { testBundle } from '../z_tests-helper/testBundle';
import { MovieButtons } from './MovieButtons';

const {
  render,
  HOC_withProviders,
  makeFakeStore,
  createMockRouter,
  fireEvent,
  storeExamples: { makeUserSlice },
} = testBundle;


/**
 *  Для теста 'Корректный рендер при AUTH' важно понимать какой будет status
 *      Мокаем createAsyncThunk в функцию, возвращающую примитив status;
 *  
 *  Если возвращать весь аргумент, то по возвращаемому значению не сможем добиться прохождения теста,
 *       созданный обьект хранится в дргуом участке памяти и несмотря на визуальное сходство,
 *       ожидаемый обьект не будет равен возвращаемому;
 * 
 *  {id: 1, status: '0'} !== {id: 1, status: '0'}
 *   X      expect(dispatchSpy).toReturnWith({ id: 1, status: '0' });
 */
jest.mock('../../store/labouring/api-actions/api-actions', () => ({
  API_ACTIONS: {
    changeFavorites: function (someData: movieFavoriteData) {
      const movieData: movieFavoriteData = arguments[0];
      return movieData.status;
    }
  }
}));


describe('Component: MovieButtons', () => {

  it('Корректный рендер при NOAUTH', () => {
    const mockStore = makeFakeStore(makeUserSlice({ authStatus: 'NOAUTH' }));
    const dispatchSpy = jest.spyOn(mockStore, 'dispatch');
    const router = createMockRouter({});
    const MovieButtonsWrapped = HOC_withProviders(MovieButtons, mockStore, router);
    const bePath = bePagesPaths.player.replace(/id/g, String(1));

    const {
      getByTestId,
      queryByTestId,
      getByRole
    } = render(MovieButtonsWrapped({ isFavorite: false, movieId: 1 }));

    expect(getByRole('link')).toHaveAttribute('href', bePath);
    expect(queryByTestId('in-list')).toBeNull();
    expect(getByTestId('add')).toBeInTheDocument();

    fireEvent.click(getByRole('button'));

    expect(router.push).toBeCalledTimes(1);
    expect(dispatchSpy).not.toBeCalled();
  });

  it('Корректный рендер при AUTH', () => {
    const mockStore = makeFakeStore(makeUserSlice({ authStatus: 'AUTH' }));
    const dispatchSpy = jest.spyOn(mockStore, 'dispatch').mockImplementation(a => a);

    const router = createMockRouter({});
    const MovieButtonsWrapped = HOC_withProviders(MovieButtons, mockStore, router);

    const {
      queryByTestId,
      getByTestId,
      getByRole,
    } = render(MovieButtonsWrapped({ isFavorite: true, movieId: 1 }));

    expect(queryByTestId('add')).toBeNull();
    expect(getByTestId('in-list')).toBeInTheDocument();
    expect(dispatchSpy).toBeCalledTimes(0);

    fireEvent.click(getByRole('button'));

    expect(dispatchSpy).toReturnWith('0');
  });

});
