import { Dispatch, ReactNode, SetStateAction } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faGear } from '@fortawesome/free-solid-svg-icons';
import styles from './TitleBar.module.css';

interface Props {
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  setSettingsIsOpen?: Dispatch<SetStateAction<boolean>>;
  settingsIsOpen?: boolean;
  children: ReactNode;
}

interface ButtonsProps {
  closeWindow: () => void;
  toggleSettings: (() => void) | null;
}

function TitleBarButtons({ closeWindow, toggleSettings }: ButtonsProps) {
  return (
    <div className={styles.buttonsContainer}>
      {toggleSettings && (
        <FontAwesomeIcon
          className={styles.icon}
          icon={faGear}
          size="xs"
          onClick={toggleSettings}
        />
      )}
      <FontAwesomeIcon
        className={styles.icon}
        icon={faCircleXmark}
        size="xs"
        onClick={closeWindow}
      />
    </div>
  );
}

function TitleBar({ setIsVisible, setSettingsIsOpen, settingsIsOpen, children }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>{children}</div>
      <TitleBarButtons
        closeWindow={() => setIsVisible(false)}
        toggleSettings={setSettingsIsOpen ? () => setSettingsIsOpen(!settingsIsOpen) : null}
      />
    </div>
  );
}

export { TitleBar };
export default TitleBar;
