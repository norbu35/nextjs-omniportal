import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import styles from './WeatherSettings.module.scss';

interface Props {
  settingsState: WeatherSettingsType;
  setSettingsState: Dispatch<SetStateAction<WeatherSettingsType>>;
}

export interface WeatherSettingsType {
  fontSize: number;
  fontColor: string;
  bgImg: boolean;
}

function WeatherSettings({ settingsState, setSettingsState }: Props) {
  const [settings, setSettings] = useState<WeatherSettingsType>(settingsState);
  const [fontSize, setFontSize] = useState<number>(settings.fontSize);
  const [isBgImg, setIsBgImg] = useState<boolean>(settings.bgImg);

  useEffect(() => {
    setSettingsState(settings);
  }, [settings, setSettingsState]);

  useEffect(() => {
    setSettings((prevState) => ({
      ...prevState,
      fontSize: fontSize,
    }));
  }, [fontSize]);

  function handleFontSizeChange(e: ChangeEvent<HTMLInputElement>) {
    setFontSize(parseInt(e.target.value));
  }

  function handleBgImgChange(e: ChangeEvent<HTMLInputElement>) {
    setIsBgImg(e.target.checked);
  }

  return (
    <div className={styles.container}>
      <label>
        Size:
        <input
          type="number"
          className={styles.checkbox}
          value={fontSize}
          onChange={handleFontSizeChange}
        />
      </label>
      <label>
        Show background image?
        <input
          type="checkbox"
          checked={isBgImg}
          onChange={handleBgImgChange}
        />
      </label>
    </div>
  );
}

export { WeatherSettings };
export default WeatherSettings;
