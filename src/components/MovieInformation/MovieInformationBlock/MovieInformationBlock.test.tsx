import { makeMovieInformation } from '../../z_tests-helper/test-data';
import { testBundle } from '../../z_tests-helper/testBundle';
import { MovieInformationBlock } from './MovieInformationBlock';

const {
  render,
  screen,
  HOC_withProviders,
  makeFakeStore,
  creators: { createReviews },
  storeExamples: { makeAppSlice },
} = testBundle;

jest.mock('../..', () => ({
  Details: () => <div data-testid='Details' />,
  Overview: () => <div data-testid='Overview' />,
  OverviewAdditional: () => <div data-testid='OverviewAdditional' />,
  Reviews: () => <div data-testid='Reviews' />,
}));

describe('Component: MovieInformationBlock', () => {
  const movie_infogmation = makeMovieInformation();
  const reviews = createReviews();

  it('Правильно применяются классы', () => {
    let MovieInformationBlockWrapped

    MovieInformationBlockWrapped
      = HOC_withProviders(MovieInformationBlock, makeFakeStore(makeAppSlice({ active_movie_item: 'Reviews' })));
    const { rerender } = render(MovieInformationBlockWrapped({ movie_infogmation, reviews }));

    // Reviews
    expect(
      screen.getByTestId('wrapper')
    ).toHaveAttribute('class', 'movie-card__reviews movie-card__row');
    expect(screen.queryByTestId('Details')).toBeNull();
    expect(screen.queryByTestId('Overview')).toBeNull();
    expect(screen.queryByTestId('OverviewAdditional')).toBeNull();
    expect(screen.getByTestId('Reviews')).toBeInTheDocument();

    //Details
    MovieInformationBlockWrapped
      = HOC_withProviders(MovieInformationBlock, makeFakeStore(makeAppSlice({ active_movie_item: 'Details' })));
    rerender(MovieInformationBlockWrapped({ movie_infogmation, reviews }));

    expect(
      screen.getByTestId('wrapper')
    ).toHaveAttribute('class', 'movie-card__text movie-card__row');
    expect(screen.getByTestId('Details')).toBeInTheDocument();
    expect(screen.queryByTestId('Reviews')).toBeNull();
    expect(screen.queryByTestId('Overview')).toBeNull();
    expect(screen.queryByTestId('OverviewAdditional')).toBeNull();

    //Overview
    MovieInformationBlockWrapped
      = HOC_withProviders(MovieInformationBlock, makeFakeStore(makeAppSlice({ active_movie_item: 'Overview' })));
    rerender(MovieInformationBlockWrapped({ movie_infogmation, reviews }));

    expect(
      screen.getByTestId('wrapper')
    ).toHaveAttribute('class', 'movie-card__text');
    expect(screen.getByTestId('Overview')).toBeInTheDocument();
    expect(screen.getByTestId('OverviewAdditional')).toBeInTheDocument();
    expect(screen.queryByTestId('Details')).toBeNull();
    expect(screen.queryByTestId('Reviews')).toBeNull();
  });

});
