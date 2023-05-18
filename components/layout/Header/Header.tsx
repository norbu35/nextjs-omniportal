import Button from '@/components/composite/Button/Button';
import styles from './Header.module.scss';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  isUnlocked: boolean;
  setIsUnlocked: Dispatch<SetStateAction<boolean>>;
}

function Header({ isUnlocked, setIsUnlocked }: Props): JSX.Element {
  let text;
  if (isUnlocked) {
    text = 'Lock';
  } else {
    text = 'Unlock';
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Portal</h1>
     <Button type="button" label={text} onClick={() => setIsUnlocked(!isUnlocked)} variant="primary"/ >
    </div>
  );
}

export { Header };
