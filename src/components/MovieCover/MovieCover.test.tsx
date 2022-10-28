import { Movie, MovieInformation } from '../../types/movies';
import { testBundle } from '../z_tests-helper/testBundle';
import MovieCover from './MovieCover';
import { bePagesPaths } from '../../helpers/const/const';
import * as ADAPTER from '../../helpers/adapter/adapter';

jest.mock('..', () => ({
  Header: () => <div data-testid='Header' />,
  MovieButtons: () => <div data-testid='MovieButtons' />,
  MovieInformation: () => <div data-testid='MovieInformation' />,
  ReviewForm: () => <div data-testid='ReviewForm' />,
}))

const {
  render,
  HOC_withProviders,
  makeFakeStore,
  createMockRouter,
  creators: { createMovie, createReviews },
  storeExamples: { makeRootState },
} = testBundle;


jest.mock('../../helpers/adapter/adapter', () => ({
  __esModule: true,
  ...jest.requireActual('../../helpers/adapter/adapter')
}));
const mockADAPTER = ADAPTER as jest.Mocked<typeof ADAPTER>;


describe('Component: MovieCover', () => {
  const reviews = createReviews(3);

  test('Успешно определяется значение isFavoriets', () => {
    let RootState, MovieCoverWrapped, movie

    RootState = makeFakeStore(makeRootState({ favorites_movies: [] }));
    MovieCoverWrapped = HOC_withProviders(MovieCover, RootState);
    movie = createMovie(false);

    const SpymockADAPTER = jest
      .spyOn(mockADAPTER, 'convertInMovieInformation')
      .mockImplementation((movie: Movie) => movie.isFavorite as unknown as MovieInformation);

    const { rerender } = render(MovieCoverWrapped({ movie, reviews }));

    // movie.isFavorite не изменится;
    expect(SpymockADAPTER).toReturnWith(false);
    SpymockADAPTER.mockClear();


    movie = createMovie(true);
    RootState = makeFakeStore(makeRootState({ favorites_movies: [movie] }));
    MovieCoverWrapped = HOC_withProviders(MovieCover, RootState);
    movie.isFavorite = false; // в favorites_movies значение true
    rerender(MovieCoverWrapped({ movie, reviews }));

    // movie.isFavorite изменится на true;
    expect(SpymockADAPTER).toReturnWith(true);
  });

  test('Корректная отрисовка на всех страницах', () => {
    const movie = createMovie();
    console.log(movie.backgroundColor);

    // В movie HEX color, в jsdom отображается RGB color
    // Чтобы тест успешно прошёл, конвертируем HEX -> RGB с помощью parseInt;
    function HEXtoRGB(hex: string) {
      // #6ceda7
      const rgb = [
        parseInt(hex.substring(1, 3), 16),
        parseInt(hex.substring(3, 5), 16),
        parseInt(hex.substring(5, 7), 16),
      ];
      return `rgb(${rgb.join(', ')})`;
    }

    const {
      getByTestId,
    } = render(
      HOC_withProviders(MovieCover, makeFakeStore(makeRootState()))
        ({ movie, reviews })
    );
    expect(getByTestId('image-require')).toBeInTheDocument();
    expect(getByTestId('Header')).toBeInTheDocument();
    expect(getByTestId('MovieButtons')).toBeInTheDocument();
    expect(getByTestId('section')
    ).toHaveAttribute('style', `background: ${HEXtoRGB(movie.backgroundColor)};`);
  });

  test('Успешная отрисовка на странице фильма', () => {
    let MockStore, MovieCoverWrapped

    const movie = createMovie();
    const router = createMockRouter({ pathname: bePagesPaths.currentMovie });
    MockStore = makeFakeStore(makeRootState({}, {}, {}, { authStatus: 'AUTH' }));
    MovieCoverWrapped = HOC_withProviders(MovieCover, MockStore, router);
    const bePath = bePagesPaths.currentMovieReview.replace('[id]', String(movie.id));
    const {
      getByTestId, queryByTestId, getByRole, queryByRole, rerender,
    } = render(MovieCoverWrapped({ movie, reviews }));

    expect(getByTestId('infoBlockClass')
    ).not.toHaveAttribute('class', 'movie-card__info');
    expect(getByTestId('cardHeroClass')
    ).toHaveAttribute('class', 'movie-card__hero');
    expect(getByTestId('section')
    ).toHaveAttribute('class', 'movie-card movie-card--full');
    expect(getByTestId('wrapClass')
    ).toHaveAttribute('class', 'movie-card__wrap');
    expect(queryByRole('poster-sec')).toBeNull();

    expect(queryByTestId('poster')).toBeNull();
    expect(getByTestId('card__desc')).toBeInTheDocument();
    expect(getByTestId('MovieInformation')).toBeInTheDocument();
    expect(getByRole('link')).toHaveAttribute('href', bePath);

    // NOAUTH
    MockStore = makeFakeStore(makeRootState({}, {}, {}, { authStatus: 'NOAUTH' }));
    MovieCoverWrapped = HOC_withProviders(MovieCover, MockStore, router);
    rerender(MovieCoverWrapped({ movie, reviews }));

    expect(queryByRole('link')).toBeNull();
  });

  test('Успешная отрисовка на странице отправки комментария к фильму', () => {

    const movie = createMovie();
    const router = createMockRouter({ pathname: bePagesPaths.currentMovieReview });
    const MovieCoverWrapped = HOC_withProviders(MovieCover, makeFakeStore(makeRootState()), router);
    const {
      getByTestId, queryByTestId,
    } = render(MovieCoverWrapped({ movie, reviews }));

    expect(getByTestId('infoBlockClass')
    ).not.toHaveAttribute('class', 'movie-card__info');
    expect(getByTestId('cardHeroClass')
    ).toHaveAttribute('class', 'movie-card__header');
    expect(getByTestId('section')
    ).toHaveAttribute('class', 'movie-card movie-card--full');
    expect(queryByTestId('card__desc')).toBeNull();
    expect(getByTestId('poster-sec')
    ).toHaveAttribute('class', 'movie-card__poster movie-card__poster--small');
    expect(getByTestId('wrapClass')
    ).not.toHaveAttribute('class', 'movie-card__wrap');
    expect(getByTestId('ReviewForm')).toBeInTheDocument();
  });

});
