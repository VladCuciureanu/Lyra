import HeaderButton from '../../Button';
import styles from './index.module.scss';

export default function ExtraButtons() {
  return (
    <div className={styles.Container}>
      <HeaderButton>X</HeaderButton>
      <HeaderButton>X</HeaderButton>
    </div>
  );
}
