import { WindowState } from '@/components/layout/Window/types';
import { WeatherSettingsType } from '@/components/widgets/Weather/WeatherSettings';

export interface WidgetState {
  window: WindowState;
  settings: WeatherSettingsType | null;
}

export interface GlobalState {
  isCollision: boolean;
  isBorder: boolean;
}

export interface AppState {
  global: GlobalState;
  widgets: {
    [key: string]: WidgetState;
  };
}
