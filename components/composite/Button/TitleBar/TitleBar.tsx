import { Dispatch, ReactNode, SetStateAction } from 'react';
import TitleBarButtons from './Buttons/TitleBarButtons';
import styles from './TitleBar.module.css';

interface Props {
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode
}

function TitleBar({ setIsVisible, setModalIsOpen, children }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>{children}</div>
      <TitleBarButtons close={() => setIsVisible(false)} openSettings={() => setModalIsOpen(true)} />
    </div>
  );
}

export { TitleBar };
export default TitleBar;
