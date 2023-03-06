'use client';

import PlayerContext from '@/hooks/player-context';
import { ReactNode, useContext, useState } from 'react';

export default function PlayerContextWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const context = useContext(PlayerContext);

  const [playing, setPlaying] = useState(context.playing);
  const [shuffle, setShuffle] = useState(context.shuffle);
  const [replay, setReplay] = useState(context.replay);
  const [track, setTrack] = useState(context.track);
  const [timestamp, setTimestamp] = useState(context.timestamp);
  const [volume, setVolume] = useState(context.volume);
  return (
    <PlayerContext.Provider
      value={{
        playing,
        shuffle,
        replay,
        track,
        timestamp,
        volume,
        setPlaying,
        setShuffle,
        setReplay,
        setTrack,
        setTimestamp,
        setVolume,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
