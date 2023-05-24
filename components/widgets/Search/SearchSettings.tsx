import { WidgetState } from '@/components/layout/types';
import styles from './SearchSettings.module.scss';

interface Props {
  widgetState: WidgetState
}
function SearchSettings({ widgetState }: Props) {
  console.log(widgetState);
  return (
    <div className={styles.container}></div>
  );
}

export { SearchSettings };
export default SearchSettings;
