import { waitFor } from '@testing-library/react';
import { testBundle } from '../z_tests-helper/testBundle';
import { VideoPlayer } from './VideoPlayer';


const {
  render,
  UserEvent,
  creators: { createMovie }
} = testBundle;

describe('Component: VideoPlayer', () => {
  const { posterImage, previewVideoLink } = createMovie();

  it('Правильный рендер', () => {
    const { getByTestId } = render(
      <VideoPlayer
        posterImage={posterImage}
        previewLink={previewVideoLink}
      />
    );
    expect(getByTestId('source')).toHaveAttribute('src', previewVideoLink);
    expect(getByTestId('video')).toHaveAttribute('poster', posterImage);
  });

  it('Корректная работа тега video ( на всех страницах )', async () => {
    const mockPlay = jest.fn();
    const mockPause = jest.fn();

    /**
     *  !js-dom не поддерживает воспроизведение аудио/медиа
     *  !переопределяем предполагаемые методы
     */
    window.HTMLVideoElement.prototype.play = mockPlay;
    window.HTMLVideoElement.prototype.load = mockPause;

    const { getByTestId } = render(
      <VideoPlayer
        posterImage={posterImage}
        previewLink={previewVideoLink}
      />
    );
    const video = getByTestId('video');

    await UserEvent.hover(video)
    waitFor(() => {
      expect(mockPlay).toBeCalledTimes(1);
      expect(mockPause).toBeCalledTimes(0);
    }, { timeout: 1050 });

    await UserEvent.unhover(video);
    expect(mockPause).toBeCalledTimes(1);

    jest.resetAllMocks();
  });

  it('Корректная работа тега video на старнице favorites', async () => {
    const fakePlay = jest.fn();
    const fakePause = jest.fn();

    window.HTMLVideoElement.prototype.play = fakePlay;
    window.HTMLVideoElement.prototype.load = fakePause;
    const { getByTestId } = render(
      <VideoPlayer
        posterImage={posterImage}
        previewLink={previewVideoLink}
        isFavoritesPage
      />
    );
    const video = getByTestId('video');
    expect(fakePlay).not.toBeCalled();
    expect(fakePause).not.toBeCalled();

    await UserEvent.hover(video);
    
    waitFor(() => {
      expect(fakePlay).not.toBeCalled();
      expect(fakePause).not.toBeCalled();
    }, { timeout: 1050 });
    await UserEvent.unhover(video);

    expect(fakePlay).not.toBeCalled();
    expect(fakePause).not.toBeCalled();
  });

});


