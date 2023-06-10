import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import styles from './WidgetSettings.module.scss';

interface WidgetSettingsProps<T extends Record<string, any>> {
  settingsState: T;
  setSettingsState: Dispatch<SetStateAction<T>>;
}

interface Setting {
  label: string;
  type: string;
  value: SettingValue;
}
type SettingValue = number | string | TemperatureUnit;
type TemperatureUnit = 'C' | 'F';

function WidgetSettings<T extends Record<string, any>>({
  settingsState,
  setSettingsState,
}: WidgetSettingsProps<T>) {
  function SettingElement({
    setting,
    settingKey,
  }: {
    setting: Setting;
    settingKey: keyof T;
  }) {
    const { label, type, value } = setting;
    const [valueState, setValueState] = useState<SettingValue>(value);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
      setValueState(parseInt(e.target.value));
    }

    switch (type) {
      case 'range':
        return (
          <label>
            {label}
            <input
              type={type}
              min={8}
              max={42}
              value={valueState}
              onChange={(e) => handleChange(e)}
            />
          </label>
        );
      case 'checkbox':
        return (
          <label>
            {label}
            <input type={type} value={value} />
          </label>
        );
      case 'select':
        return (
          <label>
            {label}
            <select>
              <option value="C">C</option>
              <option value="F">F</option>
            </select>
          </label>
        );
    }
  }

  return (
    <div className={styles.container}>
      {Object.keys(settingsState).map((key) => {
        return (
          <SettingElement
            setting={settingsState[key]}
            settingKey={key}
            key={key}
          />
        );
      })}
    </div>
  );
}

export default WidgetSettings;
