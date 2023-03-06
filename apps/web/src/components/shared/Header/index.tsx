import styles from './index.module.scss';
import Controls from './Sections/Controls';
import ExtraButtons from './Sections/ExtraButtons';
import NowPlaying from './Sections/NowPlaying';
import VolumeSlider from './Sections/VolumeSlider';

export default function Header() {
  return (
    <header className={styles.container}>
      <div id="offset" />
      <Controls />
      <NowPlaying />
      <VolumeSlider />
      <ExtraButtons />
    </header>
  );
}
