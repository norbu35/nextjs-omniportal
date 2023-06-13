import WidgetSettings from '../Widgets/WidgetSettings';

type SettingsTypes = WeatherSettings | SearchSettings | ClockSettings;

interface SettingValue {
  name: string;
  type: string;
  value: number | string | boolean;
  options?: string[];
}

interface CommonSettings {
  fontSize: SettingValue;
  fontColor: SettingValue;
}

interface WeatherSettings extends CommonSettings {
  temperatureUnit: SettingValue;
  bgImg: SettingValue;
}

interface SearchSettings extends CommonSettings {
  defaultSearchEngine: SettingValue;
}

interface ClockSettings extends CommonSettings {
  hours: SettingValue;
}

const settingsMap = {
  weather: WidgetSettings<WeatherSettings>,
  search: WidgetSettings<SearchSettings>,
  clock: WidgetSettings<ClockSettings>,
};

export { settingsMap };
export type { WeatherSettings, SearchSettings, ClockSettings, SettingsTypes };
