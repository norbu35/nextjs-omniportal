import Button from '@/components/composite/Button/Button';
import styles from './WidgetsPanel.module.scss';
import { Rnd } from 'react-rnd';

interface Props {
  isUnlocked: boolean;
  setIsUnlocked: () => void;
  setSettingsIsOpen: () => void;
}

function WidgetsPanel({ isUnlocked, setIsUnlocked, setSettingsIsOpen }: Props) {
  return (
    <Rnd
      default={{
        x: 0,
        y: 0,
        width: '10rem',
        height: '8rem',
      }}
      enableResizing={false}
      dragAxis="y"
      style={{
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '0.5em',
        display: 'flex',
        marginLeft: '2em',
        borderRadius: '15px 0 0 15px',
        padding: '0.5em',
      }}
    >
      <div className={styles.container}>
        <Button type="button" onClick={setSettingsIsOpen} variant="primary">
          Widgets
        </Button>
        <Button type="button" onClick={setIsUnlocked} variant="primary">
          {isUnlocked ? 'Lock' : 'Unlock'}
        </Button>
        <Button
          type="button"
          onClick={() => {
            localStorage.clear();
            location.reload();
          }}
          variant="primary"
        >
          Reset
        </Button>
      </div>
    </Rnd>
  );
}

export { WidgetsPanel };
export default WidgetsPanel;
