import { Dispatch, ReactNode, SetStateAction } from 'react';
import { Rnd } from 'react-rnd';
import TitleBar from '@/components/composite/TitleBar/TitleBar';
import styles from './SettingsLayout.module.scss';

interface Props {
  name: string;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

const SETTINGS_WIDTH = 500;
const SETTINGS_HEIGHT = 300;
const SETTINGS_X = window.innerWidth / 2 - SETTINGS_WIDTH / 2;
const SETTINGS_Y = window.innerHeight / 2 - SETTINGS_HEIGHT / 2;

function Settings({ name, setIsVisible, children }: Props) {
  const title = `${name.charAt(0).toUpperCase() + name.slice(1)} > Settings`;
  return (
    <div className={styles.container}>
      <Rnd
        default={{
          x: SETTINGS_X,
          y: SETTINGS_Y,
          width: SETTINGS_WIDTH,
          height: SETTINGS_HEIGHT,
        }}
        style={{
          zIndex: 1,
          backgroundColor: 'white',
        }}
      >
        <TitleBar setIsVisible={setIsVisible}>{title}</TitleBar>
        {children}
      </Rnd>
    </div>
  );
}

export { Settings };
export default Settings;
