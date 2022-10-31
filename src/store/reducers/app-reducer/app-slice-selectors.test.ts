import { getActiveFavId, getActiveGenre, getActiveMovieItem } from '../index.selectors';
import { testBundle } from '../../../components/z_tests-helper/testBundle';
import { ALL_GENRES } from '../../../helpers/const/const';

const { storeExamples: { makeRootState } } = testBundle;

describe('Selectors: app-slice', () => {
  const state = makeRootState();

  it('getActiveGenre', () => {
    const res = getActiveGenre(state);
    expect(typeof res).toBe('string');
    expect(res).toBe(ALL_GENRES);
  });

  it('getActiveMovieItem', () => {
    const res = getActiveMovieItem(state);
    expect(res).toBe('Details');

    const res$ = getActiveMovieItem(makeRootState({}, {}, { active_movie_item: 'Overview' }));
    expect(res$).toBe('Overview');

    const res$$ = getActiveMovieItem(makeRootState({}, {}, { active_movie_item: 'Reviews' }));
    expect(res$$).toBe('Reviews');

    expect(typeof res).toBe('string');
    expect(typeof res$).toBe('string');
    expect(typeof res$$).toBe('string');
  });

  it('getActiveFavId', () => {
    const res = getActiveFavId(state);
    expect(res).not.toBeTruthy();
  });

});
