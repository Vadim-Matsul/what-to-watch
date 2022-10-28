import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MoviePlayerProps } from './MoviePlayer.props';
import { MovieButtonToggle } from '../../components/Player/MovieButtonToggle/MovieButtonToggle';
import PlayerTime from '../../components/Player/PlayerTime/PlayerTime';
import { useRouter } from 'next/router';
import { bePagesPaths, ToastConfig } from '../../helpers/const/const';
import { toast } from 'react-toastify';



const MoviePlayer: React.FC<MoviePlayerProps> = ({ movie }) => {

  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const [playError, setPlayError] = useState<boolean | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const changePlayingState = useCallback(() => {
    setIsPlaying(prev => !prev);
    toast.success(ToastConfig.s_player, { autoClose: 5000 });
  }, []);
  const handleExit = () => router.push(bePagesPaths.main);
  const handleFullScreen = () => videoRef.current!.requestFullscreen();


  useEffect(() => {
    /**
     * Во время размонтирования videoRef.current будет null, т.к React-Dom изменяется,
     * блок очистки эффектов выполняется ассинхронно, вследствие removeEventListener удаляет эффекты у null,
     * 
     * Чтобы избежать ошибки: 
     *       • Единожды сохраняем HTMLElement в переменную, в дальнейшем ссылаясь на неё;
     *       • Возможно использовать useLayoutEffect, тем самым гарантируя синхронное поведение блока очистки,
     *         Но это замедлит перерисовку React-Dom;
     */
    const instance = videoRef.current!;

    if (playError) instance.muted = true;

    // Начинаем загрузку фильма, чтобы в PlayerTime/listenerLoadMetaData по окончании единожды забрать duration
    instance.load();

    /**
     *  При прямом переходе на страницу взаимодействия пользователя со страницей
     *  не было, из-за чего play() возвращает ошикбу;
     *  
     *  Видео присваивается атрибут muted = true, затем успешно воспроизводится;
     * 
     *  !При переходе с других страниц в рамках SPA ошибка не возникает;
     */
    instance.play().then(
      () => setPlayError(false),
      () => setPlayError(true)
    );

    instance.addEventListener('ended', changePlayingState);
    return () => instance!.removeEventListener('ended', changePlayingState);
  }, [playError]);


  useEffect(() => {
    playError !== null && isPlaying
      ? videoRef.current!.play()
      : videoRef.current!.pause();
  }, [isPlaying]);



  return (
    <div className="player">

      <video className="player__video" poster={movie.posterImage} ref={videoRef} >
        <source src={movie.videoLink} type='video/mp4' />
      </video>

      <button
        type="button"
        className="player__exit"
        onClick={handleExit}
      >Exit</button>

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

          <button
            type="button"
            className="player__full-screen"
            onClick={handleFullScreen}
          >
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen" />
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoviePlayer;
