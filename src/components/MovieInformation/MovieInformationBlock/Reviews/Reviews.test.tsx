import { Reviews as ReviewsType } from '../../../../types/reviews';
import { testBundle } from '../../../z_tests-helper/testBundle';
import { Reviews } from './Reviews';

jest.mock('./Review/Review', () => ({
  Review: () => <div data-testid='Review' />
}));

const {
  render,
  creators: { createReviews }
} = testBundle;

describe('Component: Reviews', () => {
  const firstComment = 'Be the first to commnet!';

  it('Корректный рендер', () => {
    let reviews: ReviewsType;
    reviews = createReviews(6);
    const {
      getAllByTestId, queryAllByTestId,
      getByText, queryByText,
      rerender
    } = render(<Reviews reviews={reviews} />);

    expect(getAllByTestId('wrapper')).toHaveLength(2);
    expect(getAllByTestId('Review')).toHaveLength(6);
    expect(queryByText(firstComment)).toBeNull();

    reviews = [];
    rerender(<Reviews reviews={reviews} />);

    expect(queryAllByTestId('wrapper')).toHaveLength(0);
    expect(queryAllByTestId('Review')).toHaveLength(0);
    expect(getByText(firstComment)).toBeInTheDocument();
  });

});
