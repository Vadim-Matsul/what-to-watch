import { testBundle } from '../z_tests-helper/testBundle';
import { Footer } from './Footer';


const { render, screen } = testBundle;

jest.mock('./LogoLink/LogoLink', () => ({
  LogoLink: () => <div>LogoLink</div>
}));

jest.mock('./Trash/Trash', () => ({
  Trash: () => <div>Trash</div>
}));

describe('Component: Footer', () => {

  it('Корректный рендер', () => {
    const { rerender } = render(<Footer />);

    expect(screen.queryByText(/Trash/i)).toBeNull();
    expect(screen.getByText(/LogoLink/i)).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();

    rerender(<Footer shouldShowTrash />);
    expect(screen.getByText(/Trash/i)).toBeInTheDocument();
  });

});
