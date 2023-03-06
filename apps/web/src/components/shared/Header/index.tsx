import styles from './index.module.css';
import Controls from './Sections/Controls';
import ExtraButtons from './Sections/ExtraButtons';
import NowPlaying from './Sections/NowPlaying';
import VolumeSlider from './Sections/VolumeSlider';

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
