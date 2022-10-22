import { Breadcrumbs } from '..';
import { testBundle } from '../z_tests-helper/testBundle';
import '@testing-library/jest-dom';

const { render, screen, Provider, configureMockStore, storeExamples: { onlyBasicCurrent } } = testBundle;
const store = configureMockStore(onlyBasicCurrent);

describe('Компонент: Breadcrumbs', () => {

  it('Успешный рендер', () => {
    let breadcrumbs, link
    breadcrumbs = screen.queryByRole('navigation');
    link = screen.queryByRole('link');

    expect(breadcrumbs).not.toBeInTheDocument();
    expect(link).not.toBeInTheDocument();

    render(
      <Provider store={store} >
        <Breadcrumbs />
      </Provider>
    );

    breadcrumbs = screen.getByRole('navigation');
    link = screen.getByRole('link',);

    expect(breadcrumbs).toBeInTheDocument();
    expect(link).toBeInTheDocument();
  });

});
