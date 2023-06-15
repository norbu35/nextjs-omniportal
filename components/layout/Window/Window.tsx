import React, {
  Dispatch,
  ForwardedRef,
  ReactElement,
  SetStateAction,
  forwardRef,
  useEffect,
  useState,
} from 'react';
import { Rnd } from 'react-rnd';
import TitleBar from '@/components/composite/TitleBar/TitleBar';
import SettingsLayout from '../Widgets/SettingsLayout';
import useWindow from './useWindow';
import { WidgetState, AppState } from '../../layout/types';
import styles from './Window.module.scss';
import { SettingsTypes, settingsMap } from './settingsMap';

interface Props {
  name: string;
  widgetState: WidgetState<SettingsTypes>;
  setAppState: Dispatch<SetStateAction<AppState>>;
  windowRefs: HTMLDivElement[];
  children: ReactElement;
  isUnlocked: boolean;
  isCollision: boolean;
  isBorder: boolean;
}

function Window(
  {
    name,
    widgetState,
    setAppState,
    windowRefs,
    isUnlocked,
    isCollision,
    isBorder,
    children,
  }: Props,
  ref: ForwardedRef<HTMLDivElement>,
): JSX.Element {
  const [windowState, setWindowState] = useState(widgetState.window);
  const [settingsState, setSettingsState] = useState(widgetState.settings);
  const [isVisible, setIsVisible] = useState<boolean>(windowState.isVisible);
  const [settingsIsOpen, setSettingsIsOpen] = useState<boolean>(false);
  const collisionIsActive = isCollision;
  const { handleDrag, handleDragStop, handleResize, handleResizeStop } =
    useWindow(windowState, windowRefs, setWindowState, collisionIsActive);

  useEffect(() => {
    setAppState((prevState) => ({
      ...prevState,
      widgets: {
        ...prevState.widgets,
        [name]: {
          ...prevState.widgets[name],
          window: windowState,
          settings: settingsState,
        },
      },
    }));
  }, [name, windowState, settingsState, setAppState]);

  useEffect(() => {
    setWindowState((prevState) => ({
      ...prevState,
      isVisible: isVisible,
    }));
  }, [isVisible]);

  const SettingsComponent = settingsMap[name as keyof typeof settingsMap];
  const title = name.charAt(0).toUpperCase() + name.slice(1);

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
          disableDragging={!isUnlocked}
          enableResizing={isUnlocked}
          onDrag={handleDrag}
          onDragStop={handleDragStop}
          onResize={handleResize}
          onResizeStop={handleResizeStop}
          bounds="section"
        >
          {isUnlocked && (
            <TitleBar
              setIsVisible={setIsVisible}
              setSettingsIsOpen={setSettingsIsOpen}
              settingsIsOpen={settingsIsOpen}
            >
              {title}
            </TitleBar>
          )}
          <div
            className={styles.children}
            style={{
              border: isBorder ? '1px solid black' : 'none',
              borderRadius: isUnlocked ? '0 0 15px 15px' : '15px',
            }}
          >
            {children}
          </div>
        </Rnd>
      </div>
      {settingsIsOpen && (
        <SettingsLayout name={name} setIsVisible={setSettingsIsOpen}>
          <SettingsComponent
            settingsState={settingsState}
            setSettingsState={setSettingsState}
          />
        </SettingsLayout>
      )}
    </>
  );
}

export default forwardRef(Window);
