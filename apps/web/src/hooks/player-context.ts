'use client';

import { PlayerContextValue } from '@/types/player-context';
import { createContext } from 'react';

export const defaultValue: PlayerContextValue = {
  playing: false,
  shuffle: false,
  replay: false,
  track: undefined,
  timestamp: 0,
  volume: 50,
};

const PlayerContext = createContext(defaultValue);

export default PlayerContext;
