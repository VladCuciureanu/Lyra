'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './index.module.scss';

export default function SidebarSectionItem({
  children,
  path,
}: {
  children: string;
  path: string;
}) {
  const currentPath = usePathname();
  return (
    <Link href={path} className={styles.Link}>
      <div
        className={styles.Container}
        style={
          currentPath === path ? { backgroundColor: 'rgba(0,0,0,0.1)' } : {}
        }
      >
        <p>{children}</p>
      </div>
    </Link>
  );
}
