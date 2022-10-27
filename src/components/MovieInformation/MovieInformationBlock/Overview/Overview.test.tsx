import { makeMovieInformation } from '../../../z_tests-helper/test-data';
import { testBundle } from '../../../z_tests-helper/testBundle';
import { Overview } from './Overview';


const {
  render
} = testBundle;

describe('Component: Overview', () => {

  it('Корректынй рендер', () => {
    const movieInformation = makeMovieInformation();
    const { getAllByTestId } = render(<Overview info={movieInformation} />);

    // [ description, director, starring ]
    const paragraphs = getAllByTestId('paragraph');

    expect(paragraphs[0]).not.toHaveAttribute('class');
    expect(paragraphs[1]).toHaveAttribute('class', 'movie-card__director');
    expect(paragraphs[2]).toHaveAttribute('class', 'movie-card__starring');
  });

});
