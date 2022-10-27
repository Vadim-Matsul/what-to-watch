import { testBundle } from '../../../../z_tests-helper/testBundle';
import { OverviewAdditional } from './OverviewAdditional';

const {
  render,
  creators: { createMovie }
} = testBundle;

describe('Component: OverviewAdditional', () => {

  it('Корректный рендер', () => {
    const movie = createMovie();
    const { getByText, getByTestId } = render(
      <OverviewAdditional
        movie_rating={movie.rating}
        scores_count={movie.scoresCount}
      />
    );
    expect(getByText(movie.rating)).toBeInTheDocument();
    expect(getByText(`${movie.scoresCount} ratings`)).toBeInTheDocument();
    expect(getByTestId('rang')).toBeInTheDocument();
  });

});
