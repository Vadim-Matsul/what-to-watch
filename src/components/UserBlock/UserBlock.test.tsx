import { testBundle } from '../z_tests-helper/testBundle';
import { UserBlock } from './UserBlock';

const {
  render,
  HOC_withProviders,
  makeFakeStore,
  storeExamples: { makeUserSlice }
} = testBundle;

jest.mock('..', () => ({
  Guest: () => <div data-testid='Guest' />,
  Logout: () => <div data-testid='Logout' />,
  User: () => <div data-testid='User' />,
}));


describe('Component: UserBlock', () => {

  it('Корректный рендер при AUTH', () => {
    const mockStore = makeFakeStore(makeUserSlice({ authStatus: 'AUTH', status: 'fulfilled' }));
    const UserBlockWrapped = HOC_withProviders(UserBlock, mockStore);
    const { getByTestId, queryByTestId } = render(UserBlockWrapped({}));

    expect(getByTestId('User')).toBeInTheDocument();
    expect(getByTestId('Logout')).toBeInTheDocument();
    expect(queryByTestId('Guest')).toBeNull();
  });

  it('Корректный рендер при NOAUTH', () => {
    const mockStore = makeFakeStore(makeUserSlice({ authStatus: 'NOAUTH', status: 'fulfilled' }));
    const UserBlockWrapped = HOC_withProviders(UserBlock, mockStore);
    const { getByTestId, queryByTestId } = render(UserBlockWrapped({}));

    expect(getByTestId('Guest')).toBeInTheDocument();
    expect(queryByTestId('Logout')).toBeNull();
    expect(queryByTestId('User')).toBeNull();
  });

});
