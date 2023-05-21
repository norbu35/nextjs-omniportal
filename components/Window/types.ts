export interface WindowState {
  position: {
    x: number,
    y: number,
  },
  size: {
    width: number,
    height: number,
  },
  maxWidth: number | string;
  minWidth: number | string;
  maxHeight: number | string;
  minHeight: number | string;
}
