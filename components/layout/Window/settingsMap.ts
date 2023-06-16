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
  bgImg: SettingValue<string>;
}

interface SearchSettings extends CommonSettings {
  borderColor: SettingValue<string>;
  defaultSearchEngine: SettingValue<string>;
}

interface ClockSettings extends CommonSettings {
  hours: SettingValue<string>;
}

interface BannerSettings {
  bgImg: SettingValue<string>;
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
