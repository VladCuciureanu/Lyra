import { ReactNode } from 'react';
import styles from './index.module.scss';

export default function SidebarSection({ children }: { children: ReactNode }) {
  return <section className={styles.Container}>{children}</section>;
}
