import Controls from './Controls';
import ExtraButtons from './ExtraButtons';
import styles from './index.module.css';
import NowPlaying from './NowPlaying';
import VolumeSlider from './VolumeSlider';

export default function Header() {
  return (
    <header className={styles.container}>
      <div />
      <Controls />
      <NowPlaying />
      <VolumeSlider />
      <ExtraButtons />
    </header>
  );
}
