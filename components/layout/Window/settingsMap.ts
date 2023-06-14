import WidgetSettings from '../Widgets/WidgetSettings';

interface SettingValue<T> {
  name: string;
  type: string;
  value: T;
  options?: string[];
}

interface CommonSettings {
  fontSize: SettingValue<number>;
  fontColor: SettingValue<string>;
}

interface Weather extends CommonSettings {
  temperatureUnit: SettingValue<string>;
  bgImg: SettingValue<string>;
}

interface Search extends CommonSettings {
  defaultSearchEngine: SettingValue<string>;
}

interface Clock extends CommonSettings {
  hours: SettingValue<string>;
}

const settingsMap = {
  weather: WidgetSettings<Weather>,
  search: WidgetSettings<Search>,
  clock: WidgetSettings<Clock>,
};

export { settingsMap };
export type {
  Weather as WeatherType,
  Search as SearchType,
  Clock as ClockType,
};
