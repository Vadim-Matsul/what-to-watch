import { bePagesPaths } from '../../helpers/const/const';
import { testBundle } from '../z_tests-helper/testBundle';
import { MovieCard } from './Movie-Card';
import * as UTILS from '../../helpers/utils/utils';
import { Events } from '../../helpers/utils/utils';
import { waitFor } from '@testing-library/react';

const {
  render,
  screen,
  faker,
  HOC_withProviders,
  createMockRouter,
  makeFakeStore,
  createBubbleEvent,
  creators: { createMovie },
  storeExamples: { makeAppSlice },
} = testBundle;

jest.mock('..', () => ({
  VideoPlayer: () => <div data-testid='VideoPlayer' />
}));

jest.mock('../../store/labouring/actions/actions', () => ({
  ACTIONS: {
    setActiveFavId: jest.fn()
      .mockImplementationOnce(() => 'first call')
      .mockImplementationOnce(() => 'second call')
  }
}));


describe('Component: MovieCard', () => {
  const { posterImage, id, name: imgTitle, previewVideoLink: previewLink } = createMovie();

  it('Корректный рендер на всех страницах', () => {

    const bePath = bePagesPaths.currentMovie.replace('[id]', String(id));
    const MovieCardWrapped = HOC_withProviders(MovieCard);

    const { getByRole, getByTestId, getByText } = render(
      MovieCardWrapped({ id, posterImage, imgTitle, previewLink })
    );

    const Link = getByRole('link');

    expect(Link).toHaveAttribute('href', bePath);
    expect(Link).not.toHaveClass('draggable');
    expect(getByTestId('article')).toHaveAttribute('draggable', 'false');
    expect(getByTestId('VideoPlayer')).toBeInTheDocument();
    expect(getByText(imgTitle)).not.toBeNull();
  });

  it('Корректный рендер на странице favorites', () => {
    const mockStore = makeFakeStore(makeAppSlice());
    const mockRouter = createMockRouter({ pathname: bePagesPaths.favorite });

    const MovieCardWrapped = HOC_withProviders(MovieCard, mockStore, mockRouter);
    const { getByRole, getByTestId } = render(
      MovieCardWrapped({ id, posterImage, imgTitle, previewLink })
    );

    expect(getByTestId('article')).toHaveAttribute('draggable', 'true');
    expect(getByRole('link')).toHaveClass('draggable');
  });

  describe('drag and drop', () => {
    const mockStore = makeFakeStore(makeAppSlice());
    const mockRouter = createMockRouter({ pathname: bePagesPaths.favorite });

    it('Успешно dispatch actions', async () => {
      const dispatchSpy = jest.spyOn(mockStore, 'dispatch').mockImplementation(a => a);
      const MovieCardWrapped = HOC_withProviders(MovieCard, mockStore, mockRouter);
      const {
        getByTestId,
        findByTestId,
      } = render(MovieCardWrapped({ id, posterImage, imgTitle, previewLink }));

      const card = getByTestId('article');

      card.dispatchEvent(createBubbleEvent('dragstart'));
      expect(await findByTestId('article')).toHaveAttribute('class', 'drag-start');
      expect(dispatchSpy).toReturnWith('first call');

      card.dispatchEvent(createBubbleEvent('dragend'));
      expect(await findByTestId('article')).toHaveAttribute('class', 'small-movie-card catalog__movies-card');
      expect(dispatchSpy).toReturnWith('second call');
    });

    it('Успешно применяются классы (id не равны)', async () => {
      const MovieCardWrapped = HOC_withProviders(MovieCard, mockStore, mockRouter);
      const {
        getByTestId,
        findByTestId,
      } = render(MovieCardWrapped({ id, posterImage, imgTitle, previewLink }));

      const card = getByTestId('article');

      card.dispatchEvent(createBubbleEvent('dragover'));
      expect(await findByTestId('article')).toHaveAttribute('class', 'drag-on-hover');
      card.dispatchEvent(createBubbleEvent('dragleave'));
      expect(await findByTestId('article')).toHaveAttribute('class', 'small-movie-card catalog__movies-card');
    });

    it('Успешно не применяются классы (id равны)', async () => {
      const mockStore = makeFakeStore(makeAppSlice({ active_fav_id: 0 }));
      const MovieCardWrapped = HOC_withProviders(MovieCard, mockStore, mockRouter);
      const {
        getByTestId,
        findByTestId,
      } = render(MovieCardWrapped({ id: 0, posterImage, imgTitle, previewLink }));

      const card = getByTestId('article');

      card.dispatchEvent(createBubbleEvent('dragover'));
      expect(await findByTestId('article')).not.toHaveAttribute('class', 'drag-on-hover');
      card.dispatchEvent(createBubbleEvent('dragleave'));
      expect(await findByTestId('article')).not.toHaveAttribute('style', 'transition: all 0.3s ease-in-out;');
    });

  });

});
