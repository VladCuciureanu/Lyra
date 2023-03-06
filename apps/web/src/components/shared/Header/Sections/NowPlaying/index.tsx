import PlayerContext from '@/hooks/player-context';
import Image from 'next/image';
import { useContext } from 'react';
import styles from './index.module.css';
import ProgressBar from './ProgressBar';

export default function NowPlaying() {
  const context = useContext(PlayerContext);
  return (
    <div className={styles.container}>
      {context?.track && (
        <>
          <div className={styles.artwork}>
            <Image
              src={context.track.album.image}
              alt="The currently playing album's artwork"
            />
          </div>
          <div className={styles['info-block']}>
            <div>Title</div>
            <div>Artist - Album</div>
            <ProgressBar />
          </div>
        </>
      )}
    </div>
  );
}
