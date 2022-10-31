import { ALL_GENRES } from '../../helpers/const/const';
import { testBundle } from '../z_tests-helper/testBundle';
import { MoreLikesMovies } from './MoreLikesMovies';

const {
  render,
  HOC_withProviders,
  makeFakeStore,
  creators: { createMovies },
  storeExamples: { makeDataBasicSlice },
} = testBundle;

jest.mock('../Move-List/Movie-List', () => ({
  __esModule: true,
  default: () => <div data-testid='Movie-List' />
}));

describe('Component: MoreLikesMovies', () => {

  it('Корректный рендер', () => {
    const movies = createMovies(false, 20);
    const {
      getByText, queryByText,
      getByTestId, queryByTestId,
      rerender,
    } = render(
      HOC_withProviders(MoreLikesMovies, makeFakeStore({ data: makeDataBasicSlice({ movies }) }))
        ({ curent_movie_id: 0, curent_movie_genre: ALL_GENRES })
    );

    expect(getByText(/More like this/i)).toBeInTheDocument();
    expect(getByTestId('Movie-List')).toBeInTheDocument();

    rerender(
      HOC_withProviders(MoreLikesMovies, makeFakeStore({ data: makeDataBasicSlice({ movies: [] }) }))
        ({ curent_movie_id: 0, curent_movie_genre: ALL_GENRES })
    )
    expect(queryByText(/More like this/i)).toBeNull();
    expect(queryByTestId('Movie-List')).toBeNull();
  });

});
