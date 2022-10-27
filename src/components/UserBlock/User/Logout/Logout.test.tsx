import { bePagesPaths } from '../../../../helpers/const/const';
import { testBundle } from '../../../z_tests-helper/testBundle';
import { Logout } from './Logout';

const {
  render,
  screen,
  fireEvent
} = testBundle;

const mockDispatch = jest.fn();
jest.mock('../../../../helpers/Hooks/useAppDispatch', () => ({
  useAppDispatch: () => mockDispatch
}));


describe('Component: Logout', () => {

  it('Правильно рендерится', () => {
    render(<Logout />);
    const Link = screen.getByRole('link')
    expect(Link).toHaveAttribute('href', bePagesPaths.main);
    expect(Link).toHaveTextContent(/Logout/i);
  });

  it('Корректно обрабатывается клик', () => {
    const { getByRole } = render(<Logout />);
    expect(mockDispatch).toBeCalledTimes(0);
    fireEvent.click(getByRole('link'));
    expect(mockDispatch).toBeCalledTimes(1);
  });

});

