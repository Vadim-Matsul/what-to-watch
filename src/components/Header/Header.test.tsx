import { testBundle } from '../z_tests-helper/testBundle';
import { Header } from './Header';

const { render } = testBundle;

jest.mock('..', () => ({
  Breadcrumbs: () => <div data-testid='Breadcrumbs' />,
  UserBlock: () => <div data-testid='UserBlock' />,
  LogoLink: () => <div data-testid='LogoLink' />,
}));

describe('Component: Header', () => {

  it('Корректно отображается', () => {
    const { getByTestId, queryByTestId, rerender } = render(<Header />);

    expect(queryByTestId('Breadcrumbs')).toBeNull();
    expect(getByTestId('UserBlock')).toBeInTheDocument();
    expect(getByTestId('header')).toHaveClass('movie-card__head');
    expect(getByTestId('LogoLink')).toBeInTheDocument();

    rerender(<Header shouldShowUser={false} isFavorite shouldShowBreadcrumbs />);

    expect(getByTestId('Breadcrumbs')).toBeInTheDocument();
    expect(queryByTestId('UserBlock')).toBeNull();
    expect(getByTestId('header')).toHaveClass('user-page__head');
    expect(getByTestId('LogoLink')).toBeInTheDocument();
  });

});
