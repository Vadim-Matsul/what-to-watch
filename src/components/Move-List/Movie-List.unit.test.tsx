import { bePagesPaths } from '../../helpers/const/const';
import { testBundle } from '../z_tests-helper/testBundle';
import MovieList from './Movie-List';

jest.mock('..', () => ({
  MovieCard: () => <div data-testid='MovieCard' />
}));

const {
  render,
  creators: { createMovies }
} = testBundle;

describe('Coomponent: MovieList', () => {

  it('Корректный рендер на всех страницах ', () => {

    // мокаем класс IntersectionObserver;
    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      configurable: true,
      enumerable: true,
      value: class IntersectionObserver {
        disconnect() { return jest.fn() };
        observe() { return jest.fn() };
      }
    });

    const movies = createMovies(false, 10);
    const {
      getAllByTestId,
      getByTestId,
      queryByRole,
      getByRole,
      rerender,
    } = render(<MovieList movies={movies} />);
    const Cards = getAllByTestId('MovieCard');

    expect(Cards.length).toBe(4);
    expect(queryByRole('link')).toBeNull();
    expect(getByTestId('showMore')).toBeInTheDocument();

    // Поведение на странице favorites
    rerender(<MovieList movies={[]} isFavorite={true} />);
    expect(getByRole('link')).toHaveAttribute('href', bePagesPaths.main);
  });

});
