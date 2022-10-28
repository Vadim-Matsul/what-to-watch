import { testBundle } from '../../z_tests-helper/testBundle';
import { ReviewFormRating } from './ReviewFormRating';


const {
  render,
  screen,
  UserEvent
} = testBundle;

describe('Component: ReviewFormRating', () => {

  it('Корректный рендер', async () => {
    const fakeChangeRating = jest.fn();

    const { rerender } = render(<ReviewFormRating setRating={fakeChangeRating} />);

    // Всё ли правильно отрендерилось
    const inputs = screen.getAllByRole('radio');
    const labels = screen.getAllByTestId('label');

    expect(inputs).toHaveLength(5);
    expect(labels).toHaveLength(5);
    expect(screen.queryByTestId('error')).toBeNull();

    // Проверка изменения значения рейтинга
    await UserEvent.click(inputs[2]);
    expect(fakeChangeRating).toBeCalledWith('3');

    // Рендер с ошибкой
    const testError = { message: 'test', type: '' };
    rerender(<ReviewFormRating error={testError} setRating={fakeChangeRating} />);
    expect(screen.getByTestId('error')).toBeInTheDocument();
  });

});
