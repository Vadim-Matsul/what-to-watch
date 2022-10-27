import { bePagesPaths } from '../../../helpers/const/const';
import { testBundle } from '../../z_tests-helper/testBundle';
import { Guest } from './Guest';

const { render } = testBundle;

describe('Component: Guest', () => {

  it('корректный рендер', () => {
    const { getByText } = render(<Guest />);
    const Link = getByText(/Sign in/i);
    expect(Link).not.toBeNull();
    expect(Link).toHaveAttribute('href', bePagesPaths.login);
  });

});
