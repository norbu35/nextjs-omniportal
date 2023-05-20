import { Dispatch, SetStateAction } from 'react';
import Button from '../composite/Button/Button';
import { WidgetState } from '../layout/types';
import styles from './Settings.module.css';

interface Props {
  state: WidgetState;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
}

function Settings({ state, setModalIsOpen }: Props) {
  return (
    <div className={styles.container}>
      Settings...
      <Button type="button" onClick={() => setModalIsOpen(false)} variant="primary">Close</Button>
    </div >
  );
}

export { Settings };
export default Settings;
