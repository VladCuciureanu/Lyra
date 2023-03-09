import styles from './index.module.scss';

export default function SidebarSearchBar() {
  return (
    <input className={styles.Container} placeholder={'Search'} type="text" />
  );
}
