import { testBundle } from '../../z_tests-helper/testBundle';
import { CurrentMovieNavigationLi } from './CurrentMovieNavigationLi';
import '@testing-library/jest-dom';
import 'axios';

const { Provider, screen, render, makeFakeStore, UserEvent, storeExamples: { onlyApp } } = testBundle;
const store = makeFakeStore(() => onlyApp);

describe('Компонент: CurrentMovieNavigationLi', () => {
  const mockItem = 'Reviews';

  it('Успешно рендерится (неактивный) ', () => {
    render(
      <Provider store={store} >
        <CurrentMovieNavigationLi item={mockItem} />
      </Provider>
    );
    const LiItem = screen.getByRole('listitem')
    expect(LiItem).toBeInTheDocument();
    expect(LiItem).not.toHaveClass('movie-nav__item--active');
  });


});
