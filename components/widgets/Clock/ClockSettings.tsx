import { WidgetState } from '@/components/layout/types';
import styles from './ClockSettings.module.scss';

interface Props {
  widgetState: WidgetState
}

function ClockSettings({ widgetState }: Props) {
  console.log(widgetState);
  return (
    <div className={styles.container}></div>
  );
}

export { ClockSettings };
export default ClockSettings;
