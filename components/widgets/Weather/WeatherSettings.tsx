import { Dispatch, SetStateAction } from 'react';
import WidgetSettings from '@/components/layout/Widgets/WidgetSettings';

interface Props {
  settingsState: WeatherSettingsType;
  setSettingsState: Dispatch<SetStateAction<WeatherSettingsType>>;
}

export interface CommonSettings {
  fontSize: {
    name: string;
    type: string;
    value: number;
  };
  fontColor: {
    name: string;
    type: string;
    value: [number, number, number];
  };
}

export interface WeatherSettingsType extends CommonSettings {
  temperatureUnit: {
    name: string;
    type: string;
    value: 'C' | 'F';
  };
  bgImg: {
    name: string;
    type: string;
    value: boolean;
  };
}

function WeatherSettings({ settingsState, setSettingsState }: Props) {
  return (
    <WidgetSettings<WeatherSettingsType>
      settingsState={settingsState}
      setSettingsState={setSettingsState}
    />
  );
}

export default WeatherSettings;
