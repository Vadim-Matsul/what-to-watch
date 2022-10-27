import { bePagesPaths } from '../../helpers/const/const';
import { testBundle } from '../z_tests-helper/testBundle';
import MovieCard from './Movie-Card';


const {
  render,
  HOC_withProviders,
  createMockRouter,
  creators: { createMovie },
} = testBundle;

jest.mock('..', () => ({
  VideoPlayer: () => <div data-testid='VideoPlayer' />
}));

jest.mock('../../helpers/Hooks/useDrag', () => ({
  useDrag: () => jest.fn()
}));

describe('Component: MovieCard', () => {
  const { posterImage, id, isFavorite, name: imgTitle, previewVideoLink: previewLink } = createMovie();

  it('Корректный рендер на всех страницах', () => {

    const bePath = bePagesPaths.currentMovie.replace('[id]', String(id));
    const MovieCardWrapped = HOC_withProviders(MovieCard);

    const { getByRole, getByTestId, getByText } = render(
      MovieCardWrapped({ id, posterImage, isFavorite, imgTitle, previewLink })
    );

    const Link = getByRole('link');
    
    expect(Link).toHaveAttribute('href', bePath);
    expect(Link).not.toHaveClass('draggable');
    expect(getByTestId('article')).toHaveAttribute('draggable', 'false');
    expect(getByTestId('VideoPlayer')).toBeInTheDocument();
    expect(getByText(imgTitle)).not.toBeNull();
  });

  it('Корректный рендер на странице favorites', () => {

    const mockRouter = createMockRouter({ pathname: bePagesPaths.favorite });

    const MovieCardWrapped = HOC_withProviders(MovieCard, undefined, mockRouter);
    const { getByRole, getByTestId } = render(
      MovieCardWrapped({ id, posterImage, isFavorite: true, imgTitle, previewLink })
    );

    expect(getByTestId('article')).toHaveAttribute('draggable', 'true');
    expect(getByRole('link')).toHaveClass('draggable');
  });

});
