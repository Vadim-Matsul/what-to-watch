import { bePagesPaths } from '../../helpers/const/const';
import { createMovie } from '../z_tests-helper/test-data';
import { testBundle } from '../z_tests-helper/testBundle';
import { Breadcrumbs } from './Breadcrumbs';

const {
  render,
  screen,
  HOC_withProviders,
  makeFakeStore,
  storeExamples: { makeDataCurrentSlice } } = testBundle;

describe('Component: Breadcrumbs', () => {

  it('Корректный рендер компонента', () => {
    const fakeMovie = createMovie();
    const toBePath = bePagesPaths.currentMovie.replace(`[id]`, String(fakeMovie.id));
    const BreadcrumbsWrapped = HOC_withProviders(Breadcrumbs, makeFakeStore({ data: makeDataCurrentSlice({ current_movie: fakeMovie }) }));
    render(BreadcrumbsWrapped({}));

    expect(screen.getByRole('link')).toHaveAttribute('href', toBePath);
    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
  });

});
