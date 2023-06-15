import { WindowState } from '@/components/layout/Window/types';

export interface WidgetState {
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
    [key: string]: WidgetState;
  };
}
