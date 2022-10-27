import { useEffect, useRef } from 'react'
import { VideoPlayerProps } from './VideoPlayer.props'


export const VideoPlayer: React.FC<VideoPlayerProps> = ({ previewLink, posterImage, isFavoritesPage = false }) => {

  const wrapperVideo = useRef<HTMLVideoElement>(null);
  const videoTimeout = useRef<NodeJS.Timeout>();


  useEffect(() => {
    const { current } = wrapperVideo;
    current!.width = 280;
    current!.height = 175;
    current!.poster = posterImage;
    current!.muted;

    return () => clearTimeout(videoTimeout.current);
  }, []);

  const handleVideoPlay = () => {
    if (isFavoritesPage) return;
    videoTimeout.current = setTimeout(() => {
      wrapperVideo.current!.play();
    }, 1000);
  };

  const handleVideoPause = () => {
    if (isFavoritesPage) return;
    wrapperVideo.current!.load();
    clearTimeout(videoTimeout.current);
  }

  return (
    <div
      className="small-movie-card__image"
      onMouseEnter={handleVideoPlay}
      onMouseLeave={handleVideoPause}
    >
      <video ref={wrapperVideo} data-testid='video'>
        <source src={previewLink} data-testid='source' />
      </video>
    </div>
  );
};
