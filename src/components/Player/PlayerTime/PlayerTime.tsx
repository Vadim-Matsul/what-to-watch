import React, { useEffect, useState } from 'react';
import { getNormolizeVideoTime, guardEventListener } from '../../../helpers/utils/utils';
import { PlayerTimeProps } from './PlayerTime.props';


const PlayerTime: React.FC<PlayerTimeProps> = ({ videoRef }) => {
  const [currentTimeState, setCurrentTimeState] = useState<number>(0);
  const [durationTime, setDurationTime] = useState<number>(0);
  const [percent, setPercent] = useState<number>(0);

  const lastTime = getNormolizeVideoTime(currentTimeState, durationTime);

  useEffect(() => {

    const listenerChangeData = (evt: Event) => {
      const { currentTime } = evt.target as HTMLVideoElement; // у EventTarget необходимо сужать тип
      setCurrentTimeState(Math.trunc(currentTime));
      setPercent(Math.round((currentTime / durationTime) * 100));
    };

    const listenerLoadMetaData = (evt: Event) => {
      const { duration } = evt.target as HTMLVideoElement;
      setDurationTime(Math.trunc(duration));
    };

    //! Т.к videoRef используется с модуля MoviePlayer, возможно значение null при размонтировании, 
    //!     поведение не обрабатываем;
    const removeTimeupdate = guardEventListener('timeupdate', videoRef.current!, listenerChangeData);
    const removeLoadedmetadata = guardEventListener('loadedmetadata', videoRef.current!, listenerLoadMetaData);

    return () => {
      removeTimeupdate!();
      removeLoadedmetadata!();
    };
  }, [durationTime]);

  return (
    <div className="player__controls-row">
      <div className="player__time">
        <progress className="player__progress" value={percent || 0} max="100" data-testid='progress' />
        <div className="player__toggler" style={{ left: percent + '%' }} >Toggler</div>
      </div>
      <div className="player__time-value">{lastTime}</div>
    </div>
  );
};

export default React.memo(PlayerTime);
