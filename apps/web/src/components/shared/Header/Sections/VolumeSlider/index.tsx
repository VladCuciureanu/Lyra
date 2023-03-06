'use client';

import SpeakerIcon from '@/components/Shared/Icons/Speaker';
import SpeakerWavesIcon from '@/components/Shared/Icons/SpeakerWaves';
import PlayerContext from '@/hooks/player-context';
import { useContext } from 'react';
import * as Slider from '@radix-ui/react-slider';

import styles from './index.module.scss';

export default function VolumeSlider() {
  const context = useContext(PlayerContext);
  return (
    <div className={styles.container}>
      <button
        onClick={() => context.setVolume(0)}
        className={styles.button}
        style={{ marginRight: '-0.25rem' }}
      >
        <SpeakerIcon />
      </button>
      <Slider.Root
        className={styles.SliderRoot}
        value={[context.volume]}
        onValueChange={(value) => context.setVolume(value.at(0))}
        aria-label="Volume"
      >
        <Slider.Track className={styles.SliderTrack}>
          <Slider.Range className={styles.SliderRange} />
        </Slider.Track>
        <Slider.Thumb className={styles.SliderThumb} />
      </Slider.Root>
      <button onClick={() => context.setVolume(100)} className={styles.button}>
        <SpeakerWavesIcon />
      </button>
    </div>
  );
}
