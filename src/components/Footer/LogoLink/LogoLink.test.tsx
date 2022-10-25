import { testBundle } from '../../z_tests-helper/testBundle';
import { LogoLink } from './LogoLink';

const { screen, render } = testBundle;


describe('Component: LogoLink', () => {

  it('test', () => {
    const res = render(<LogoLink />);
    console.log('res result', res);
    screen.debug();

  });

});
