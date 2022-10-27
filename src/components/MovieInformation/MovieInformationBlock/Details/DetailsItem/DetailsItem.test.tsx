import { testBundle } from '../../../../z_tests-helper/testBundle';
import { DetailsItem } from './DetailsItem';


const {
  render,
  creators: { createMovie }
} = testBundle;

describe('Component: DetailsItem', () => {

  it('Корректный рендер', () => {
    const movie = createMovie();
    const {
      getByTestId,
      getByText
    } = render(<DetailsItem name={movie.name} value='test' />);

    expect(getByTestId('details-name')).toHaveTextContent(movie.name);
    expect(getByText('test')).toBeInTheDocument();
  });

});
