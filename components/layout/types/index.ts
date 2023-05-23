import { WindowState } from '@/components/layout/Window/types';
import WeatherSettingsType from '@/components/widgets/Weather/Settings';

export interface WidgetState {
  window: WindowState;
  settings: WeatherSettingsType | null
}

export interface WidgetStates {
  [key: string]: WidgetState;
}
