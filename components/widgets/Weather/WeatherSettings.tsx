import { Dispatch, SetStateAction } from 'react';
import WidgetSettings from '@/components/layout/Widgets/WidgetSettings';

interface Props {
  settingsState: WeatherSettingsType;
  setSettingsState: Dispatch<SetStateAction<WeatherSettingsType>>;
}

export interface CommonSettings {
  fontSize: number;
  fontColor: string;
}

export interface WeatherSettingsType extends CommonSettings {
  temperatureUnit: string;
  bgImg: boolean;
}

function WeatherSettings({ settingsState, setSettingsState }: Props) {
  return (
    <WidgetSettings<WeatherSettingsType>
      settingsState={settingsState}
      setSettingsState={setSettingsState}
    />
  );
}

export { WeatherSettings };
export default WeatherSettings;
