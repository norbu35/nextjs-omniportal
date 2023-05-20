import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faGear } from '@fortawesome/free-solid-svg-icons';
import styles from './TitleBarButtons.module.css';

interface Props {
  close: () => void;
  openSettings: () => void;
}

function TitleBarButtons({ close, openSettings }: Props) {
  return (
    <div className={styles.container}>
      <FontAwesomeIcon
        className={styles.icon}
        icon={faGear}
        size="xs"
        onClick={openSettings}
      />
      <FontAwesomeIcon
        className={styles.icon}
        icon={faCircleXmark}
        size="xs"
        onClick={close}
      />
    </div>
  );
}

export { TitleBarButtons };
export default TitleBarButtons;
