import { Dispatch, SetStateAction, ChangeEvent } from 'react';
import styles from './WidgetSettings.module.scss';

interface WidgetSettingsProps<T extends Record<string, any>> {
  settingsState: T;
  setSettingsState: Dispatch<SetStateAction<T>>;
}

function WidgetSettings<T extends Record<string, any>>({
  settingsState,
  setSettingsState,
}: WidgetSettingsProps<T>) {
  function handleChange<K extends keyof T>(key: K, value: T[K]) {
    setSettingsState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  }

  return (
    <div className={styles.container}>
      {Object.entries(settingsState).map(([key, value]) => (
        <label key={key}>
          {key}:
          <input
            type={typeof value === 'number' ? 'number' : 'text'}
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(key as keyof T, e.target.value as T[keyof T])
            }
          />
        </label>
      ))}
    </div>
  );
}

export default WidgetSettings;
