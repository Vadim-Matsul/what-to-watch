import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MoviePlayerProps } from './MoviePlayer.props';
import { MovieButtonToggle } from '../../components/Player/MovieButtonToggle/MovieButtonToggle';
import PlayerTime from '../../components/Player/PlayerTime/PlayerTime';



const MoviePlayer: React.FC<MoviePlayerProps> = ({ movie }) => {

  const videoRef = useRef<HTMLVideoElement>();
  const [playError, setPlayError] = useState<boolean | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const changePlayingState = useCallback(() => setIsPlaying(prev => !prev), []);

  useEffect(() => {
    if (playError) videoRef.current.muted = true;

    // Начинаем загрузку фильма, чтобы в PlayerTime/listenerLoadMetaData по окончании единожды забрать duration
    videoRef.current.load();

    /**
     *  При прямом переходе на страницу взаимодействия пользователя со страницей
     *  не было, из-за чего play() возвращает ошикбу;
     *  
     *  Видео присваивается атрибут muted = true, затем успешно воспроизводится;
     * 
     *  !При переходе с других страниц в рамках SPA ошибка не возникает;
     */
    videoRef.current.play().then(
      () => setPlayError(false),
      () => setPlayError(true)
    );

    videoRef.current.addEventListener('ended', changePlayingState);
    return () => videoRef.current.removeEventListener('ended', changePlayingState);
  }, [playError]);

  useEffect(() => {
    playError !== null && isPlaying
      ? videoRef.current.play()
      : videoRef.current.pause();
  }, [isPlaying]);

  return (
    <div className="player">

      <video className="player__video" poster={movie.posterImage} ref={videoRef} >
        <source src={movie.videoLink} type='video/mp4' />
      </video>

      <button type="button" className="player__exit">Exit</button>

      <div className="player__controls">
        <PlayerTime
          videoRef={videoRef}
        />

        <div className="player__controls-row">

          <MovieButtonToggle
            isPlaying={isPlaying}
            changePlayingState={changePlayingState}
          />

          <div className="player__name">{movie.name}</div>

          <button type="button" className="player__full-screen">
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoviePlayer;
