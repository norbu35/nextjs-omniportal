import { ReactNode } from 'react';
import styles from './Modal.module.css';

interface Props {
  children: ReactNode;
}

function Modal({ children }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>{children}</div>
    </div>
  );
}

export { Modal };
export default Modal;