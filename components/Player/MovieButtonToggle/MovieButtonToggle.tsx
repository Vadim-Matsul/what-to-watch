import { MovieButtonToggleProps } from './MovieButtonToggle.props'


export const MovieButtonToggle: React.FC<MovieButtonToggleProps> = ({ isPlaying, changePlayingState }) => (
  <span onClick={changePlayingState} >
    {isPlaying
      ?
      <button type="button" className="player__play" >
        <svg viewBox="0 0 14 21" width="14" height="21">
          <use xlinkHref="#pause"></use>
        </svg>
        <span>Pause</span>
      </button>

      : <button type="button" className="player__play">
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref="#play-s"></use>
        </svg>
        <span>Play</span>
      </button>}
  </span>
);
