import CompleteTrack from '@lyra/schema';

interface PlayerContextValue {
  playing: boolean;
  shuffle: boolean;
  replay: false | true | 1;
  track?: CompleteTrack;
  timestamp?: number;
  volume: number;

  setPlaying?: function;
  setShuffle?: function;
  setReplay?: function;
  setTrack?: function;
  setTimestamp?: function;
  setVolume?: function;
}
