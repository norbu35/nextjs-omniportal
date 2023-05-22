import Button from '@/components/composite/Button/Button';
import styles from './Header.module.scss';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  isUnlocked: boolean;
  setIsUnlocked: Dispatch<SetStateAction<boolean>>;
}

function Header({ isUnlocked, setIsUnlocked }: Props): JSX.Element {
  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', gap: '1em', width: '100%', justifyContent: 'center' }}>
        <Button
          type="button"
          onClick={() => setIsUnlocked(!isUnlocked)}
          variant="primary"
        >
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
    </div>
  );
}

export { Header };
