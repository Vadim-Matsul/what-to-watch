import { makeMovieInformation } from '../z_tests-helper/test-data';
import { testBundle } from '../z_tests-helper/testBundle';
import { MovieInformation } from './MovieInformation';

jest.mock('..', () => ({
  CurrentMovieNavigation: () => <div data-testid='CurrentMovieNavigation' />,
  MovieInformationBlock: () => <div data-testid='MovieInformationBlock' />
}));

const {
  render,
  screen,
  creators: { createReviews }
} = testBundle;

describe('Component: MovieInformation', () => {

  it('Корректный рендер', () => {
    const reviews = createReviews();
    const movie_infogmation = makeMovieInformation();
    render(
      <MovieInformation
        reviews={reviews}
        movie_infogmation={movie_infogmation}
      />
    );
    expect(screen.getByRole('img')).toHaveAttribute('alt', movie_infogmation.name);
    expect(screen.getByTestId('CurrentMovieNavigation')).toBeInTheDocument();
    expect(screen.getByTestId('MovieInformationBlock')).toBeInTheDocument();
  });

});
