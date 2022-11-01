import { AnyAction } from '@reduxjs/toolkit';
import { waitFor } from '@testing-library/react';
import { ErrorConfig } from '../../helpers/const/const';
import { ReviewFormData } from '../../types/reviews';
import { testBundle } from '../z_tests-helper/testBundle';
import { ReviewForm } from './ReviewForm';

const fakeDispatch = jest.fn();
jest.mock('../../helpers/Hooks/useAppDispatch', () => ({
  useAppDispatch: () => fakeDispatch.mockImplementation((a: AnyAction) => a)
}));

jest.mock('../../store/labouring/api-actions/api-actions', () => ({
  API_ACTIONS: {
    postMovieReview: jest.fn()
      .mockImplementationOnce((someData: ReviewFormData) => someData.comment)
  }
}));


const {
  render,
  screen,
  UserEvent,
  faker,
  HOC_withProviders,
  createMockRouter,
} = testBundle;

describe('Component: ReviewForm', () => {
  const fakeID = 1;

  beforeEach(() => {
    jest.restoreAllMocks();
  })

  it('Корректный рендер', () => {
    render(<ReviewForm movieId={fakeID} />);

    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Review text/i)).toBeInTheDocument();
    expect(screen.queryByTestId('error')).toBeNull();
    expect(screen.queryByTestId('error_comment')).toBeNull();
    expect(screen.getByRole('button')).toHaveTextContent(/Post/i);
  });


  it('Правильная обработка ошибок формы', async () => {

    render(<ReviewForm movieId={fakeID} />);

    const button = screen.getByRole('button');
    await UserEvent.click(button);

    expect(await screen.findByTestId('error_comment')).toHaveTextContent(ErrorConfig.required);
    expect(await screen.findByTestId('error')).toHaveTextContent(ErrorConfig.indicateRating);

    const errorLongComment = faker.datatype.string(151);
    const textArea = screen.getByPlaceholderText(/Review text/i);
    textArea.focus();
    await UserEvent.paste(errorLongComment);

    waitFor(() =>
      expect(screen.getByTestId('error_comment')).toHaveTextContent(ErrorConfig.longComment),
      { timeout: 100 }
    );
  });

  it('Успешно отправлена форма', async () => {

    const router = createMockRouter({});
    const ReviewFormWrapped = HOC_withProviders(ReviewForm, undefined, router);

    const {
      getByPlaceholderText,
      getByDisplayValue,
      getByRole,
    } = render(ReviewFormWrapped({ movieId: fakeID }));

    const comment = faker.datatype.string(80);
    getByPlaceholderText(/Review text/i).focus();
    await UserEvent.paste(comment);

    const inp = getByDisplayValue('3');
    await UserEvent.click(inp);

    const button = getByRole('button');
    await UserEvent.click(button);

    expect(button).toHaveTextContent(/Pending/i);

    waitFor(() => {
      expect(fakeDispatch).toBeCalledTimes(1);
      expect(router.back).toBeCalledTimes(1);
      expect(fakeDispatch).toReturnWith(comment);
    }, { timeout: 100 });

  });




});
