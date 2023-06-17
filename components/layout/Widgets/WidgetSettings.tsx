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
    const { label, type, value, options } = setting;
    const [valueState, setValueState] = useState(value);
    const [displayColorPicker, setDisplayColorPicker] =
      useState<boolean>(false);

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

    const inputMap: Record<string, JSX.Element> = {
      number: (
        <input
          className={styles.input}
          id={label}
          type="number"
          value={valueState}
          onChange={handleChange}
        />
      ),
      checkbox: (
        <input
          className={styles.input}
          id={label}
          type="checkbox"
          checked={valueState === 'true'}
          onChange={handleChange}
        />
      ),
      select: (
        <select
          className={styles.input}
          id={label}
          value={valueState}
          onChange={handleChange}
        >
          {options &&
            options.map((option) => {
              return (
                <option value={option} key={option}>
                  {option}
                </option>
              );
            })}
        </select>
      ),
      color: displayColorPicker ? (
        <div className={styles.colorPicker}>
          <SketchPicker
            color={valueState as Color}
            onChange={handleColorChange}
          />
        </div>
      ) : (
        <div
          className={styles.button}
          style={{ background: valueState }}
          onClick={() => setDisplayColorPicker(!displayColorPicker)}
        />
      ),
    };

    return (
      <label className={styles.setting}>
        <div className={styles.label}>{label}</div>
        <div className={styles.input}>{inputMap[type]}</div>
      </label>
    );
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
