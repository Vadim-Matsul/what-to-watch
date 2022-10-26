import { testBundle } from '../z_tests-helper/testBundle';
import { CurrentMovieNavigation } from './CurrentMovieNavigation';

const {
  render,
  screen,
} = testBundle;

// компонент CurrentMovieNavigationLi протестирован,
// мокаем чтобы не вводить Provider
jest.mock('./CurrentMovieNavigationLi/CurrentMovieNavigationLi', () => ({
  CurrentMovieNavigationLi: () => <div data-testid='li' />
}));

describe('Component: CurrentMovieNavigation', () => {

  it('корректный рендер', () => {
    render(<CurrentMovieNavigation />);
    expect(screen.getByRole('navigation')).not.toBeNull();
    expect(screen.getAllByTestId('li').length).toBe(3);
  });

});
