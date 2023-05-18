export interface WidgetState {
  position: {
    x: number,
    y: number,
  },
  size: {
    width: number,
    height: number
  }
  minWidth: number | string | undefined,
  minHeight: number | string | undefined,
}

export interface WidgetStates {
  [key: string]: WidgetState
}
