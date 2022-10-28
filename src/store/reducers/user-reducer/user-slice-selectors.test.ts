import { testBundle } from '../../../components/z_tests-helper/testBundle';
import { getAuthStatus, getStatusProgress, getUser } from '../index.selectors';

const {
  creators: { createFakeUser },
  storeExamples: { makeRootState },
} = testBundle;

describe('Selectors: user-slice', () => {
  const state = makeRootState();

  it('getUser', () => {
    const res = getUser(state);
    expect(res).not.toBeTruthy();

    const res$ = getUser(makeRootState({}, {}, {}, { user: createFakeUser() }));
    expect(typeof res$).toBe('object');
  });

  it('getAuthStatus', () => {
    const res = getAuthStatus(state);
    expect(res).toBe('UNKNOWN');
    expect(typeof res).toBe('string');

    const res$ = getAuthStatus(makeRootState({}, {}, {}, { authStatus: 'AUTH' }));
    expect(res$).toBe('AUTH');
    expect(typeof res$).toBe('string');

    const res$$ = getAuthStatus(makeRootState({}, {}, {}, { authStatus: 'NOAUTH' }));
    expect(res$$).toBe('NOAUTH');
    expect(typeof res$$).toBe('string');
  });

  it('getStatusProgress', () => {
    const res = getStatusProgress(state);
    expect(res).toBe('none');
    expect(typeof res).toBe('string');

    const res$ = getStatusProgress(makeRootState({}, {}, {}, { status: 'fulfilled' }));
    expect(res$).toBe('fulfilled');
    expect(typeof res$).toBe('string');

    const res$$ = getStatusProgress(makeRootState({}, {}, {}, { status: 'pending' }));
    expect(res$$).toBeTruthy();

    const res$$$ = getStatusProgress(makeRootState({}, {}, {}, { status: 'rejected' }));
    expect(res$$$).toBe('rejected');
    expect(typeof res$$$).toBe('string');
  });

});
