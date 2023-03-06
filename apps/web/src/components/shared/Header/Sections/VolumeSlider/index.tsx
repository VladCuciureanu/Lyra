'use client';

import SpeakerIcon from '@/components/Shared/Icons/Speaker';
import SpeakerWavesIcon from '@/components/Shared/Icons/SpeakerWaves';
import PlayerContext from '@/hooks/player-context';
import { useContext } from 'react';
import styles from './index.module.scss';

export default function VolumeSlider() {
  const context = useContext(PlayerContext);
  return (
    <div className={styles.container}>
      <button onClick={() => context.setVolume(0)} className={styles.button}>
        <SpeakerIcon />
      </button>
      <input
        className={styles.input}
        type={'range'}
        min={0}
        max={100}
        value={context.volume}
        onChange={(evt) => context.setVolume(evt.target.value)}
      />
      <button onClick={() => context.setVolume(100)} className={styles.button}>
        <SpeakerWavesIcon />
      </button>
    </div>
  );
}
