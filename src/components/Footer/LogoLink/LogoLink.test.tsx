import { bePagesPaths } from '../../../helpers/const/const';
import { testBundle } from '../../z_tests-helper/testBundle';
import { LogoLink } from './LogoLink';

const { render, screen } = testBundle;

describe('Component: LogoLink', () => {

  it('Корректный рендер (подсвечивается)', () => {
    render(<LogoLink isLight />);
    const Link = screen.getByRole('link');

    expect(Link).toHaveAttribute('href', bePagesPaths.main);
    expect(Link).toHaveClass('logo__link--light');
  });

  it('Корректный рендер (не подсвечивается)', () => {
    render(<LogoLink isLight={false} />);
    expect(screen.getByRole('link')).not.toHaveClass('logo__link--light');
  });

});
