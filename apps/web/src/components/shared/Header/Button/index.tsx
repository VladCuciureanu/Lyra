import { ButtonHTMLAttributes } from 'react';
import styles from './index.module.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function HeaderButton(props: ButtonProps) {
  return (
    <button className={styles.button} {...props}>
      {props.children}
    </button>
  );
}
