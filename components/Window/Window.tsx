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
import { Rnd } from 'react-rnd';

import Modal from 'components/layout/Modal/Modal';
import TitleBar from '@/components/composite/Button/TitleBar/TitleBar';
import Settings from '@/components/settings/Settings';

import { useWindow } from './useWindow';

import styles from './Window.module.scss';
import { WidgetState, WidgetStates } from '../layout/types';
import { WindowState } from './types';

interface Props {
  name: string;
  state: WidgetState;
  setGlobalState: Dispatch<SetStateAction<WidgetStates>>;
  windowRefs: HTMLDivElement[];
  children: ReactNode;
  isUnlocked: boolean;
}

function Window(
  {
    name,
    state: initialState,
    setGlobalState,
    windowRefs,
    isUnlocked,
    children,
  }: Props,
  ref: ForwardedRef<HTMLDivElement>,
): JSX.Element {
  const [state, setState] = useState<WidgetState>(initialState);
  const [windowState, setWindowState] = useState<WindowState>(state.window);
  const [isVisible, setIsVisible] = useState<boolean>(state.isVisible);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const { handleDrag, handleDragStop, handleResize, handleResizeStop } = useWindow(state.window, windowRefs, setWindowState);
  const heading = name.charAt(0).toUpperCase() + name.slice(1);

  useEffect(() => {
    setGlobalState((prevState) => ({
      ...prevState,
      [name]: state,
    }));
  }, [state, setGlobalState, name]);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      isVisible: isVisible,
    }));
  }, [isVisible]);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      window: windowState,
    }));
  }, [windowState]);

  return (
    <div className={styles.container} ref={ref}>
      <Rnd
        position={{
          x: windowState.position.x,
          y: windowState.position.y,
        }}
        size={{
          width: windowState.size.width,
          height: windowState.size.height,
        }}
        maxWidth={windowState.maxWidth}
        minWidth={windowState.minWidth}
        maxHeight={windowState.maxHeight}
        minHeight={windowState.minHeight}
        disableDragging={isUnlocked ? false : true}
        enableResizing={isUnlocked ? true : false}
        onDrag={handleDrag}
        onDragStop={handleDragStop}
        onResize={handleResize}
        onResizeStop={handleResizeStop}
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

export default forwardRef(Window);
