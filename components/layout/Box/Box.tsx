import { ReactNode } from 'react';
import styles from './Box.module.css';

type Props = {
  children: ReactNode;
  heading: string;
};

function Box({ heading, children }: Props): JSX.Element {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{heading}</h1>
      {children}
    </div>
  );
}

export { Box };
