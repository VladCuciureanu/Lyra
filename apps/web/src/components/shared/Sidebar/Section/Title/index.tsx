import styles from './index.module.scss';

export default function SidebarSectionTitle({
  children,
}: {
  children: string;
}) {
  return <h2 className={styles.Main}>{children}</h2>;
}
