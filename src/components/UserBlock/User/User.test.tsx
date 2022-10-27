import { testBundle } from '../../z_tests-helper/testBundle';
import { getFakeUser } from '../../z_tests-helper/test-data';
import { User } from './User';
import { bePagesPaths } from '../../../helpers/const/const';

const { render } = testBundle;

jest.mock('react-redux', () => ({
  useSelector: () => getFakeUser()
}));

describe('Component: User', () => {

  it('Корректный рендер', () => {
    const { getByRole } = render(<User />);
    expect(getByRole('link')).toHaveAttribute('href', bePagesPaths.favorite);
  });

});
