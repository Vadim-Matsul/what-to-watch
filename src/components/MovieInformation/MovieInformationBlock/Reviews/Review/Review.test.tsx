import { testBundle } from '../../../../z_tests-helper/testBundle';
import { Review } from './Review';


const {
  render,
  creators: { createReview }
} = testBundle;

describe('Component: Review', () => {

  it('Корректный рендер', () => {
    const review = createReview();
    const { getByText, getByTestId } = render(<Review review={review} />);

    expect(getByText(review.comment)).toBeInTheDocument();
    expect(getByText(review.user.name)).not.toBeNull();
    expect(getByText(review.rating)).not.toBeNull();
    expect(getByTestId('date')).toBeInTheDocument();
  });

});
