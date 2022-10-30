import { testBundle } from '../../z_tests-helper/testBundle';
import { Trash } from './Trash';
import { movieFavoriteData } from '../../../types/movies';

const {
  render,
  HOC_withProviders,
  makeFakeStore,
  createBubbleEvent,
  storeExamples: { makeAppSlice },
} = testBundle;


jest.mock('../../../store/labouring/api-actions/api-actions', () => ({
  API_ACTIONS: {
    changeFavorites: function () {
      const DATA: movieFavoriteData = arguments[0];
      return DATA.status;
    }
  }
}));

describe('Component: Trash', () => {
  const store = makeFakeStore(makeAppSlice())
  const TrashWrapped = HOC_withProviders(Trash, store);

  it('Корректный рендер', () => {
    const { getByTestId } = render(TrashWrapped({}));
    expect(getByTestId('trash')).not.toBeNull();
    expect(getByTestId('svg')).toBeInTheDocument();
  });

  it('Корректная работа всех функций', async () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch').mockImplementation(a => a);
    const { getByTestId, findByTestId } = render(TrashWrapped({}));

    const trash = getByTestId('trash');

    trash.dispatchEvent(createBubbleEvent('dragover'));
    expect(await findByTestId('svg')).toHaveAttribute('class', 'trash-over');

    trash.dispatchEvent(createBubbleEvent('dragleave'));
    expect(await findByTestId('svg')).not.toHaveAttribute('class', 'trash-over');

    trash.dispatchEvent(createBubbleEvent('drop'));
    expect(dispatchSpy).toReturnWith('0');
  });

});
