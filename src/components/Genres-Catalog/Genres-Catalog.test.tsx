import * as UTILS from '../../helpers/utils/utils';
import { testBundle } from '../z_tests-helper/testBundle';
import { GenresCatalog } from './Genres-Catalog';

jest.mock('..', () => ({
  GenreItem: () => <div>GenreItem</div>
}));

jest.mock('../../helpers/utils/utils', () => ({
  __esModule: true,
  ...jest.requireActual('../../helpers/utils/utils')
}));

const {
  render,
  screen,
  makeFakeStore,
  HOC_withProviders,
  storeExamples: { makeDataBasicSlice }
} = testBundle;

describe('Component: GenresCatalog', () => {

  it('Корректный рендер', () => {
    const spyAllGenres = jest
      .spyOn(UTILS, 'getMoviesGenres')
      .mockReturnValue(Array(3).fill('test'));

    render(
      HOC_withProviders(
        GenresCatalog, makeFakeStore({ data: makeDataBasicSlice({}) })
      )({})
    );

    expect(spyAllGenres).toBeCalledTimes(1);
    expect(screen.getByRole('list')).not.toBeNull();
    expect(screen.getAllByText(/GenreItem/i).length).toBe(3);
  });

});
