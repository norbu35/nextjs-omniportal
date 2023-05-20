import React, {
  Dispatch,
  ForwardedRef,
  ReactNode,
  SetStateAction,
  forwardRef,
  useEffect,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { DraggableData, Rnd } from 'react-rnd';

import Modal from '../Modal/Modal';
import TitleBar from '@/components/composite/Button/TitleBar/TitleBar';
import Settings from '@/components/settings/Settings';

import { WidgetState, WidgetStates } from '../types';
import styles from './Box.module.scss';

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
): JSX.Element {
  const [state, setState] = useState<WidgetState>(initialState[name]);
  const [isVisible, setIsVisible] = useState<boolean>(state.isVisible);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [isCollision, setIsCollision] = useState<boolean>(false);
  const { window } = state;
  const [safePoint, setSafePoint] = useState<Coordinates>({
    x: window.position.x,
    y: window.position.y,
  });
  const heading = name.charAt(0).toUpperCase() + name.slice(1);

  useEffect(() => {
    setStates((prevState) => ({
      ...prevState,
      [name]: state,
    }));
  }, [state, setStates, name]);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      isVisible: isVisible,
    }));
  }, [isVisible]);

  function handleOverlap(node: HTMLElement, { x, y }: Coordinates) {
    const main = node;
    const targetRect = main.getBoundingClientRect();
    [...boxRefs].some((element) => {
      if (element.children[0] === main) {
        return;
      }
      if (
        haveIntersection(
          element.children[0].getBoundingClientRect(),
          targetRect,
        )
      ) {
        setIsCollision(true);
        return true;
      }
      setIsCollision(false);
      y -= 243;
      setSafePoint({ x, y });
    });
  }

  function handleDrag(_e: any, { node, x, y }: DraggableData): void {
    console.log({ x, y });
    setTimeout(() => handleOverlap(node, { x, y }));
  }

  function handleDragStop(_e: any, d: DraggableData) {
    if (isCollision) {
      setState((prevState) => ({
        ...prevState,
        window: {
          ...prevState.window,
          position: {
            x: safePoint.x,
            y: safePoint.y,
          },
        },
      }));
      setIsCollision(false);
    } else {
      setState((prevState) => ({
        ...prevState,
        window: {
          ...prevState.window,
          position: {
            x: d.x,
            y: d.y,
          },
        },
      }));
    }
  }

  return (
    <div className={styles.container} ref={ref}>
      <Rnd
        position={{
          x: window.position.x,
          y: window.position.y,
        }}
        size={{
          width: window.size.width,
          height: window.size.height,
        }}
        maxWidth={window.maxWidth}
        minWidth={window.minWidth}
        maxHeight={window.maxHeight}
        minHeight={window.minHeight}
        disableDragging={isUnlocked ? false : true}
        enableResizing={isUnlocked ? true : false}
        onDrag={handleDrag}
        onDragStop={handleDragStop}
        onResizeStop={(_e, _direction, elRef, _delta, position) => {
          setState((prevState) => ({
            ...prevState,
            size: {
              width: parseInt(elRef.style.width),
              height: parseInt(elRef.style.height),
            },
            position: {
              x: position.x,
              y: position.y,
            },
          }));
        }}
        bounds="section"
      >
        {isUnlocked && (
          <TitleBar setIsVisible={setIsVisible} setModalIsOpen={setModalIsOpen}>
            {heading}
          </TitleBar>
        )}
        <div
          className={styles.children}
          style={{ borderRadius: isUnlocked ? '0 0 15px 15px' : '15px' }}
        >
          {children}
        </div>
      </Rnd>
      {modalIsOpen &&
        createPortal(
          <Modal>
            <Settings state={state} setModalIsOpen={setModalIsOpen} />
          </Modal>,
          document.body,
        )}
    </div>
  );
}

export default forwardRef(Box);
