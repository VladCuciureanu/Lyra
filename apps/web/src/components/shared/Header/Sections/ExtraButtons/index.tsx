import HeaderButton from '../../Button';
import styles from './index.module.css';

export default function ExtraButtons() {
  return (
    <div className={styles.container}>
      <HeaderButton>X</HeaderButton>
      <HeaderButton>X</HeaderButton>
    </div>
  );
}
