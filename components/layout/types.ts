import { WindowState } from '@/components/layout/Window/types';
import { SettingsTypes } from './Window/settingsMap';

export interface WidgetState<T extends SettingsTypes> {
  window: WindowState;
  settings: T;
}

export interface GlobalState {
  enableCollision: boolean;
  displayBorder: boolean;
}

export interface AppState {
  global: GlobalState;
  widgets: {
    [key: string]: WidgetState<SettingsTypes>;
  };
}
