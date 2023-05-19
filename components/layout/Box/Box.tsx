/* eslint-disable import/no-extraneous-dependencies */
import React, {
  Dispatch,
  ForwardedRef,
  ReactNode,
  SetStateAction,
  forwardRef,
  useEffect,
  useState,
} from 'react';
import { DraggableData, Rnd } from 'react-rnd';
import styles from './Box.module.scss';
import { WidgetState, WidgetStates } from '../types';

interface Props {
  name: string;
  state: WidgetStates;
  setStates: Dispatch<SetStateAction<WidgetStates>>;
  boxRefs: HTMLDivElement[];
  children: ReactNode;
  isUnlocked: boolean;
}

interface Coordinates {
  x: number;
  y: number;
}

function haveIntersection(other: DOMRect, main: DOMRect): boolean {
  return !(
    main.x > other.x + other.width ||
    main.x + main.width < other.x ||
    main.y > other.y + other.height ||
    main.y + main.height < other.y
  );
}

function Box(
  {
    name,
    state: initialState,
    setStates,
    boxRefs,
    isUnlocked,
    children,
  }: Props,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const [state, setState] = useState<WidgetState>(initialState[name]);
  const [isCollision, setIsCollision] = useState<boolean>(false);
  const [safePoint, setSafePoint] = useState<Coordinates>({ x: state.position.x, y: state.position.y });

  const heading = name.charAt(0).toUpperCase() + name.slice(1);

  useEffect(
    () => {
      setStates((prevState) => ({
        ...prevState,
        [name]: state,
      }));
    },
    [state, setStates, name],
  );

  function handleOverlap(node: HTMLDivElement, { x, y }: Coordinates) {
    const main = node;
    const targetRect = main.getBoundingClientRect();
    [...boxRefs].some((element) => {
      if (element.children[0] === main) {
        return;
      }
      if (haveIntersection(element.children[0].getBoundingClientRect(), targetRect)) {
        setIsCollision(true);
        return true;
      }
      setIsCollision(false);
    });
  }
  // function handleDragStart(_e, { node, x, y }: DraggableData): void {
  //   setSafePoint({ x, y });
  // }

  function handleDrag(_e, { node, x, y }: DraggableData): void {
    setSafePoint({ x, y });
    console.log('safePOint: ', safePoint);
    setTimeout(() => handleOverlap(node, { x, y }), 1);
    console.log('handle: ', { x, y });
  }

  function handleDragStop(_e, d: DraggableData) {
    if (isCollision) {
      setState((prevState) => ({
        ...prevState,
        position: {
          x: safePoint.x,
          y: safePoint.y,
        },
      }));
      setIsCollision(false);
    } else {
      setState((prevState) => ({
        ...prevState,
        position: {
          x: d.x,
          y: d.y,
        },
      }));
    }
  }
  console.log(`${name}`, state.position);
  return (
    <div className={styles.container} ref={ref}>
      <Rnd
        position={{
          x: state.position.x,
          y: state.position.y,
        }}
        size={{
          width: state.size.width,
          height: state.size.height,
        }}
        maxWidth={state.maxWidth}
        minWidth={state.minWidth}
        maxHeight={state.maxHeight}
        minHeight={state.minHeight}
        disableDragging={isUnlocked ? false : true}
        // onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragStop={handleDragStop}
        enableResizing={isUnlocked ? true : false}
        onResizeStop={(_e, _direction, _ref, _delta, _position) => {
          setState((prevState) => ({
            ...prevState,
            size: {
              width: parseInt(_ref.style.width),
              height: parseInt(_ref.style.height),
            },
          }));
        }}
      >
        {isUnlocked && <div className={styles.titleBar}>{heading}</div>}
        {children}
      </Rnd>
    </div>
  );
}

export default forwardRef(Box);
