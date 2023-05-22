import React, {
  Dispatch,
  ForwardedRef,
  ReactNode,
  SetStateAction,
  forwardRef,
  useEffect,
  useState,
} from 'react';
import { Rnd } from 'react-rnd';

import TitleBar from '@/components/composite/TitleBar/TitleBar';

import { useWindow } from './useWindow';

import { WidgetState, WidgetStates } from '../../layout/types';
import { WindowState } from './types';
import styles from './Window.module.scss';
import Settings from '../Widgets/Settings';

interface Props {
  name: string;
  state: WidgetState;
  setState: Dispatch<SetStateAction<WidgetStates>>;
  windowRefs: HTMLDivElement[];
  children: ReactNode;
  isUnlocked?: boolean;
}

function Window(
  {
    name,
    state,
    setState,
    windowRefs,
    isUnlocked,
    children,
  }: Props,
  ref: ForwardedRef<HTMLDivElement>,
): JSX.Element {
  const [widgetState, setWidgetState] = useState<WidgetState>(state);
  const [windowState, setWindowState] = useState<WindowState>(widgetState.window);
  const { handleDrag, handleDragStop, handleResize, handleResizeStop } = useWindow(windowState, windowRefs, setWindowState);
  const [isVisible, setIsVisible] = useState<boolean>(windowState.isVisible);
  const [settingsIsOpen, setSettingsIsOpen] = useState<boolean>(false);
  const title = name.charAt(0).toUpperCase() + name.slice(1);

  useEffect(() => {
    setWidgetState((prevState) => ({
      ...prevState,
      window: windowState,
    }));
  }, [windowState, name]);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      [name]: widgetState,
    }));
  }, [widgetState, name, setState]);

  useEffect(() => {
    setWindowState(prevState => ({
      ...prevState,
      isVisible: isVisible,
    }));
  }, [isVisible]);


  return (
    <>
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
            <TitleBar setIsVisible={setIsVisible} setSettingsIsOpen={setSettingsIsOpen} settingsIsOpen={settingsIsOpen}>
              {title}
            </TitleBar>
          )}
          <div
            className={styles.children}
            style={{ borderRadius: isUnlocked ? '0 0 15px 15px' : '15px' }}
          >
            {children}
          </div>
        </Rnd>
      </div>
      {settingsIsOpen &&
        <Settings name={name} state={state} setIsVisible={setSettingsIsOpen}>test</Settings>
      }
    </>
  );
}

export default forwardRef(Window);


