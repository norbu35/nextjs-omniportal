import { WindowState } from '@/components/layout/Window/types';
import { SettingsTypes } from './Window/settingsMap';

export interface WidgetState<SettingsTypes> {
  window: WindowState;
  settings: SettingsTypes;
}

export interface GlobalState {
  isCollision: boolean;
  isBorder: boolean;
}

export interface AppState {
  global: GlobalState;
  widgets: {
    [key: string]: WidgetState<SettingsTypes>;
  };
}
