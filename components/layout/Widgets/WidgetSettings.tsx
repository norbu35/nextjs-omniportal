import { Dispatch, SetStateAction, useState } from 'react';
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

  function SettingElement({ setting }) {
    const { label, type, value } = setting;
    const [valueState, setValueState] = useState<number>(value);
    let element;

    switch (type) {
      case 'range':
        element = (
          <label>
            {label}
            <input
              type={type}
              min={8}
              max={42}
              value={valueState}
              onChange={(e) => setValueState(parseInt(e.target.value))}
            />
          </label>
        );
        break;
      case 'checkbox':
        element = (
          <label>
            {label}
            <input type={type} value={value} />
          </label>
        );
        break;
      case 'select':
        element = (
          <label>
            {label}
            <select>
              <option value="C">C</option>
              <option value="F">F</option>
            </select>
          </label>
        );
        break;
    }
    return element;
  }

  return (
    <div className={styles.container}>
      {Object.keys(settingsState).map((key) => {
        return <SettingElement setting={settingsState[key]} key={key} />;
      })}
    </div>
  );
}

export default WidgetSettings;
