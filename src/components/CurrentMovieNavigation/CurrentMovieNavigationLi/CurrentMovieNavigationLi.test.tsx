import { testBundle } from '../../z_tests-helper/testBundle';
import { CurrentMovieNavigationLi } from './CurrentMovieNavigationLi';


const {
  render,
  screen,
  HOC_withProviders,
  makeFakeStore,
  fireEvent,
  storeExamples: { makeAppSlice }
} = testBundle;

describe('Component: CurrentMovieNavigationLi', () => {
  const mockStore = makeFakeStore(makeAppSlice({}));
  const CurrentMovieNavigationLiWrapped =
    HOC_withProviders(CurrentMovieNavigationLi, mockStore);

  it('Корректный рендер компонента (неактивный)', async () => {
    render(CurrentMovieNavigationLiWrapped({ item: 'Reviews' }));
    expect(screen.getByRole('listitem')).not.toHaveClass('movie-nav__item--active');
  });

  it('Корректный рендер компонента (активный)', async () => {
    render(CurrentMovieNavigationLiWrapped({ item: 'Details' }));
    expect(screen.getByRole('listitem')).toHaveClass('movie-nav__item--active');
  });

  it('Активный пункт меню успешно меняется', () => {
    const dispatchSpy = jest.spyOn(mockStore, 'dispatch');
    render(CurrentMovieNavigationLiWrapped({ item: 'Details' }));

    fireEvent.click(screen.getByRole('listitem'))
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
  });

});
