import { WindowState } from '@/components/layout/Window/types';

export interface WidgetState<T> {
  window: WindowState;
  settings: T;
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
