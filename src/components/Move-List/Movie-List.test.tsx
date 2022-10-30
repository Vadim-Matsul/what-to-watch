import { bePagesPaths } from '../../helpers/const/const';
import { testBundle } from '../z_tests-helper/testBundle';
import MovieList from './Movie-List';

jest.mock('..', () => ({
  MovieCard: () => <div data-testid='MovieCard' />
}));

const {
  render,
  fireEvent,
  creators: { createMovies }
} = testBundle;

describe('Coomponent: MovieList', () => {
  const movies = createMovies(false, 20);
  const fakeDisconnect = jest.fn();
  const fakeObserve = jest.fn();

  it('IntersectionObserver успешно срабатывает при scroll', async () => {
    const movies = createMovies(false, 20);
    const container = document.createElement('section');

    type Entries = Array<{ isIntersecting: boolean }>;
    type Callback = (entries: Entries, observer: IntersectionObserver) => void;

    const mockIntersectionObserver = class {
      scrollContainer: HTMLElement;
      entries: Entries;

      // создаем переменную scrollContainer, на которую вешаем слушатель события onscroll,
      // При fireEvent.scroll(container); срабатывает событие -> число в состоянии увеличивается на 4;
      constructor(callback: Callback, settings: Record<string, unknown>) {
        this.scrollContainer = container;
        this.entries = [{ isIntersecting: true }];
        this.scrollContainer.addEventListener('scroll', () => {
          callback(this.entries, this as unknown as IntersectionObserver);
        });
      }

      observe() { this.entries = [{ isIntersecting: true }] }
      unobserve() { this.entries = [] };
      disconnect() { this.entries = [] };
    }

    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      configurable: true,
      enumerable: true,
      value: mockIntersectionObserver,
    });

    const {
      findAllByTestId,
    } = render(<MovieList movies={movies} />, { container: document.body.appendChild(container) });
    let cards: HTMLElement[];

    cards = await findAllByTestId('MovieCard');
    expect(cards.length).toBe(4);

    fireEvent.scroll(container);
    cards = await findAllByTestId('MovieCard');
    expect(cards.length).toBe(8);

    fireEvent.scroll(container);
    cards = await findAllByTestId('MovieCard');
    expect(cards.length).toBe(12);

    fireEvent.scroll(container);
    cards = await findAllByTestId('MovieCard');
    expect(cards.length).toBe(16);

    fireEvent.scroll(container);
    cards = await findAllByTestId('MovieCard');
    expect(cards.length).toBe(20);

    fireEvent.scroll(container);
    cards = await findAllByTestId('MovieCard');
    expect(cards.length).toBeLessThanOrEqual(20);
  });


  it('Корректный рендер на всех страницах ', () => {

    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      configurable: true,
      enumerable: true,
      value: class IntersectionObserver {
        disconnect() { return fakeDisconnect };
        observe() { return fakeObserve };
      }
    });

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
