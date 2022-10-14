import { useEffect, useRef } from 'react'
import { VideoPlayerProps } from './VideoPlayer.props'



export const VideoPlayer: React.FC<VideoPlayerProps> = ({ previewLink, posterImage }) => {

  const wrapperVideo = useRef<HTMLVideoElement>();
  const videoTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const { current } = wrapperVideo;
    current.width = 280;
    current.height = 175;
    current.poster = posterImage;
    current.muted;

    return clearTimeout(videoTimeout.current);
  }, []);

  const handleVideoPlay = () => {
    videoTimeout.current = setTimeout(() => {
      wrapperVideo.current.play();
    }, 1000);
  };

  const handleVideoPause = () => {
    wrapperVideo.current.pause();
    wrapperVideo.current.load();
    clearTimeout(videoTimeout.current);
  }

  return (
    <div
      className="small-movie-card__image"
      onMouseEnter={handleVideoPlay}
      onMouseLeave={handleVideoPause}
    >
      <video ref={wrapperVideo} >
        <source src={previewLink} />
      </video>
    </div>
  );
};
