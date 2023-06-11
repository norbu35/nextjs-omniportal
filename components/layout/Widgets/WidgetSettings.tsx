import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { Color, ColorResult, SketchPicker } from 'react-color';
import styles from './WidgetSettings.module.scss';

interface WidgetSettingsProps<T> {
  settingsState: T;
  setSettingsState: Dispatch<SetStateAction<T>>;
}

interface Setting {
  label: string;
  type: string;
  value: number | string;
  options?: string[];
}

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
    const [valueState, setValueState] = useState(value);

    function handleChange(
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) {
      let newValue: number | string;
      if (e.target.type === 'checkbox') {
        newValue = valueState ? '' : 'true';
      } else {
        newValue = e.target.value;
      }
      setValueState(newValue);
      setSettingsState((prevState) => ({
        ...prevState,
        [settingKey]: {
          ...prevState[settingKey],
          value: newValue,
        },
      }));
    }

    function handleColorChange(
      color: ColorResult,
      _: ChangeEvent<HTMLInputElement>,
    ) {
      setValueState(color.hex);
      setSettingsState((prevState) => ({
        ...prevState,
        [settingKey]: {
          ...prevState[settingKey],
          value: color.hex,
        },
      }));
    }

    switch (type) {
      case 'number':
        return (
          <label htmlFor={label}>
            {label}
            <input
              id={label}
              type={type}
              value={valueState}
              onChange={handleChange}
            />
          </label>
        );
      case 'checkbox':
        return (
          <label htmlFor={label}>
            {label}
            <input
              id={label}
              type={type}
              checked={valueState === 'true'}
              onChange={handleChange}
            />
          </label>
        );
      case 'select':
        return (
          <label htmlFor={label}>
            {label}
            <select id={label} value={valueState} onChange={handleChange}>
              {setting.options!.map((option) => {
                return (
                  <option value={option} key={option}>
                    {option}
                  </option>
                );
              })}
            </select>
          </label>
        );
      case 'color':
        return (
          <label htmlFor={label}>
            {label}
            <SketchPicker
              color={valueState as Color}
              onChangeComplete={handleColorChange}
            />
          </label>
        );
      default:
        return <></>;
    }
  }

  return (
    <div className={styles.container}>
      {Object.keys(settingsState).map((key) => {
        return (
          <SettingElement
            setting={settingsState[key as keyof T]}
            settingKey={key as keyof T}
            key={key}
          />
        );
      })}
    </div>
  );
}

export default WidgetSettings;
