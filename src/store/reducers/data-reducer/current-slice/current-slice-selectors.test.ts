import { testBundle } from '../../../../components/z_tests-helper/testBundle';
import { getCurrentMovie, getCurrentMovieReviews } from '../../index.selectors';


const {
  creators: { createMovie },
  storeExamples: { makeRootState },
} = testBundle;

describe('Selectors: current-slice', () => {
  const state = makeRootState();

  it('getCurrentMovie', () => {
    const res = getCurrentMovie(state);
    expect(res).toBeNull();

    const current_movie = createMovie();
    const state$ = makeRootState({}, { current_movie });
    const res$ = getCurrentMovie(state$);
    expect(res$).toEqual(current_movie);
  });

  it('getCurrentMovieReviews', () => {
    const res = getCurrentMovieReviews(state);
    expect(Array.isArray(res)).toBeTruthy();
  });

});
