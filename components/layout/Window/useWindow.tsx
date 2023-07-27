import { Dispatch, SetStateAction, useState } from 'react';
import { DraggableData, RndResizeCallback } from 'react-rnd';
import { WindowState } from './types';

type Direction =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'topRight'
  | 'bottomRight'
  | 'bottomLeft'
  | 'topLeft';

function haveIntersection(other: DOMRect, main: DOMRect): boolean {
  return !(
    main.x > other.x + other.width ||
    main.x + main.width < other.x ||
    main.y > other.y + other.height ||
    main.y + main.height < other.y
  );
}

export default function useWindow(
  windowState: WindowState,
  windowRefs: HTMLDivElement[],
  setWindowState: Dispatch<SetStateAction<WindowState>>,
  isCollisionEnabled: boolean,
) {
  const [safeState, setSafeState] = useState<WindowState>(windowState);
  const [enableCollision, setEnableCollision] = useState<boolean>(false);

  function handleOverlap(
    node: HTMLElement,
    newPos: { x: number; y: number },
    newSize: { width: number; height: number },
  ) {
    const main = node;
    const targetRect = main.getBoundingClientRect();
    [...windowRefs].some((element) => {
      if (element.children[0] === main) {
        return;
      }
      if (
        haveIntersection(
          element.children[0].getBoundingClientRect(),
          targetRect,
        )
      ) {
        setEnableCollision(true);
        return true;
      }
      setSafeState((prevState: WindowState) => ({
        ...prevState,
        position: {
          x: newPos.x,
          y: newPos.y,
        },
        size: {
          ...prevState.size,
          width: newSize.width,
          height: newSize.height,
        },
      }));
      setEnableCollision(false);
    });
  }

  function handleDrag(_e: any, { node, x, y }: DraggableData): void {
    const width = node.clientWidth;
    const height = node.clientHeight;
    y = y - 80;
    handleOverlap(node, { x, y }, { width, height });
  }

  const handleResize: RndResizeCallback = (
    _e,
    _dir,
    elementRef,
    _delta,
    position,
  ) => {
    const width = elementRef.clientWidth;
    const height = elementRef.clientHeight;
    handleOverlap(elementRef, position, { width, height });
  };

  function handleDragStop(_e: any, d: DraggableData) {
    if (isCollisionEnabled && enableCollision) {
      setWindowState((prevState: WindowState) => ({
        ...prevState,
        position: {
          x: safeState.position.x,
          y: safeState.position.y,
        },
      }));
    } else {
      setWindowState((prevState: WindowState) => ({
        ...prevState,
        position: {
          x: d.x,
          y: d.y,
        },
      }));
    }
    setEnableCollision(false);
  }

  function handleResizeStop(
    _e: MouseEvent | TouchEvent,
    _direction: Direction,
    elRef: any,
    _delta: any,
    position: { x: number; y: number },
  ) {
    if (isCollisionEnabled && enableCollision) {
      setWindowState((prevState: WindowState) => ({
        ...prevState,
        size: safeState.size,
        position: safeState.position,
      }));
    } else {
      setWindowState((prevState: WindowState) => ({
        ...prevState,
        size: {
          ...prevState.size,
          width: parseInt(elRef.style.width),
          height: parseInt(elRef.style.height),
        },
        position: position,
      }));
    }
  }

  return { handleDrag, handleDragStop, handleResize, handleResizeStop };
}
