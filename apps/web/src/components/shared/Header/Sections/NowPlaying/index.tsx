'use client';

import PlayerContext from '@/hooks/player-context';
import Image from 'next/image';
import { useContext } from 'react';
import styles from './index.module.scss';
import ProgressBar from './ProgressBar';

export default function NowPlaying() {
  const context = useContext(PlayerContext);
  return (
    <div className={styles.Container}>
      <div className={styles.Artwork}>
        {context?.track && (
          <Image
            src={context.track.album.image}
            alt="The currently playing album's artwork"
          />
        )}
      </div>
      {context?.track ? (
        <div className={styles.InfoBlock}>
          <div>Title</div>
          <div>Artist - Album</div>
          <ProgressBar />
        </div>
      ) : (
        <div className={styles.SkeletonBlock}>Lyra</div>
      )}
    </div>
  );
}
