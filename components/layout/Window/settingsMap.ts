import WidgetSettings from '../Widgets/WidgetSettings';

interface CommonSettings {
  fontSize: {
    name: string;
    type: string;
    value: number;
  };
  fontColor: {
    name: string;
    type: string;
    value: string;
  };
}

interface WeatherSettings extends CommonSettings {
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

interface SearchSettings extends CommonSettings {
  defaultSearchEngine: string;
}

interface ClockSettings extends CommonSettings {
  hours: '24' | '12';
}

const settingsMap = {
  weather: WidgetSettings<WeatherSettings>,
  search: WidgetSettings<SearchSettings>,
  clock: WidgetSettings<ClockSettings>,
};

export default settingsMap;
