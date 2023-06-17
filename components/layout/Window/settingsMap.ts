import WidgetSettings from '../Widgets/WidgetSettings';

interface SettingValue<T> {
  label: string;
  type: string;
  value: T;
  options?: string[];
}

interface CommonSettings {
  fontSize: SettingValue<number>;
  fontColor: SettingValue<string>;
}

interface WeatherSettings extends CommonSettings {
  temperatureUnit: SettingValue<string>;
  backgroundImage: SettingValue<string>;
}

interface SearchSettings extends CommonSettings {
  backgroundColor: SettingValue<string>;
  accentColor: SettingValue<string>;
  optionsColor: SettingValue<string>;
  defaultSearchEngine: SettingValue<string>;
}

interface ClockSettings extends CommonSettings {
  hours: SettingValue<string>;
}

interface BannerSettings {
  backgroundImage: SettingValue<string>;
}

type SettingsTypes = WeatherSettings | SearchSettings | ClockSettings;

const settingsMap: Record<string, React.ComponentType<any>> = {
  weather: WidgetSettings<WeatherSettings>,
  search: WidgetSettings<SearchSettings>,
  clock: WidgetSettings<ClockSettings>,
};

export { settingsMap };
export type {
  WeatherSettings,
  SearchSettings,
  ClockSettings,
  BannerSettings,
  SettingsTypes,
};
