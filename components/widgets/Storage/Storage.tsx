import { WidgetState } from '@/components/layout/types';
import styles from './Storage.module.scss';
import { StorageSettings } from '@/components/layout/Window/settingsMap';

interface Props {
  state: WidgetState<StorageSettings>
}

function Storage({ state }: Props): JSX.Element {
  const { settings } = state;
  console.log(settings);

  return (
    <div className={styles.container}>
    </div>
  );
}

export default Storage;
