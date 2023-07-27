import { Dispatch, ReactNode, SetStateAction } from 'react';

import { Rnd } from 'react-rnd';
import TitleBar from '@/components/composite/TitleBar/TitleBar';
import styles from './SettingsLayout.module.scss';
import capitalize from '@/utils/string/capitalize';

interface Props {
  name: string;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

const SETTINGS_WIDTH = 500;
const SETTINGS_HEIGHT = 300;
const SETTINGS_X = window.innerWidth / 2 - SETTINGS_WIDTH / 2;
const SETTINGS_Y = window.innerHeight / 2 - SETTINGS_HEIGHT / 2;

export default function Settings({ name, setIsVisible, children }: Props) {
  return (
    <div className={styles.container}>
      <Rnd
        default={{
          x: SETTINGS_X,
          y: SETTINGS_Y,
          width: 'auto',
          height: 'auto',
        }}
        style={{
          zIndex: 1,
          backgroundColor: 'white',
          borderRadius: '0 0 1rem 1rem',
        }}
        enableResizing={false}
      >
        <TitleBar setIsVisible={setIsVisible}>
          Settings &gt; {capitalize(name)}
        </TitleBar>
        {children}
      </Rnd>
    </div>
  );
}
