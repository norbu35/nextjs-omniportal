import { Dispatch, ReactNode, SetStateAction } from 'react';
import { Rnd } from 'react-rnd';
import TitleBar from '@/components/composite/TitleBar/TitleBar';
import { WidgetState } from '../types';
import styles from './Settings.module.scss';

interface Props {
  name: string
  state: WidgetState;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  children: ReactNode
}

const SETTINGS_WIDTH = 500;
const SETTINGS_HEIGHT = 500;
const SETTINGS_X = document.body.clientWidth / 2 - SETTINGS_WIDTH / 2;
const SETTINGS_Y = document.body.clientHeight / 2 - SETTINGS_HEIGHT / 2;

function Settings({ name, state, setIsVisible, children }: Props) {
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
      >
        <TitleBar setIsVisible={setIsVisible}>{title}</TitleBar>
        {children}
      </Rnd>
    </div>
  );
}

export { Settings };
export default Settings;
