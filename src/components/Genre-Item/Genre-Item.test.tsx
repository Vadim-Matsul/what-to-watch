import { testBundle } from '../z_tests-helper/testBundle';
import { GenreItem } from './Genre-Item';


const {
  render,
  screen,
  UserEvent,
  makeFakeStore,
  HOC_withProviders,
  storeExamples: { makeAppSlice }
} = testBundle;

describe('Component: GenreItem', () => {

  it('Корректнре функционирование', async () => {
    const store = makeFakeStore(makeAppSlice())
    const GenreItemWrapped = HOC_withProviders(GenreItem, store);
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    const { rerender, getByRole } = render(GenreItemWrapped({ genre: 'All genres' }));

    const LI = getByRole('listitem');
    expect(LI).toHaveAttribute('class', 'catalog__genres-item cursor');

    await UserEvent.click(LI);
    expect(dispatchSpy).toBeCalledTimes(1);

    rerender(GenreItemWrapped({ genre: 'Adventure' }));
    const LI$ = getByRole('listitem');
    expect(LI$).toHaveClass('catalog__genres-item--active cursor-active');
  });

});
