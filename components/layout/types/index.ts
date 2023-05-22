import { WindowState } from '@/components/layout/Window/types';

export interface WidgetState {
  isVisible: boolean;
  window: WindowState;
}

export interface WidgetStates {
  [key: string]: WidgetState;
}
