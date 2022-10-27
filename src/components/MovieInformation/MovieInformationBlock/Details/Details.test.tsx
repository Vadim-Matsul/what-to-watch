import { makeMovieInformation } from '../../../z_tests-helper/test-data';
import { testBundle } from '../../../z_tests-helper/testBundle';
import { Details } from './Details';


const { render } = testBundle;

jest.mock('./DetailsItem/DetailsItem', () => ({
  DetailsItem: () => <div data-testid='DetailsItem' />
}))

describe('Component: Details', () => {

  it('Корректный рендер', () => {
    const {
      getAllByTestId,
    } = render(<Details info={makeMovieInformation()} />);

    expect(getAllByTestId('wrapper')).toHaveLength(2);
    expect(getAllByTestId('DetailsItem')).toHaveLength(5);
  });

});
