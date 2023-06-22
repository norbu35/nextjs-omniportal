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
import capitalize from '@/utils/string/capitalize';

interface Props {
  name: string;
  widgetState: WidgetState<SettingsTypes>;
  setAppState: Dispatch<SetStateAction<AppState>>;
  windowRefs: HTMLDivElement[];
  children: ReactElement;
  isUnlocked: boolean;
  isCollisionEnabled: boolean;
  displayBorder: boolean;
}

function Window(
  {
    name,
    widgetState,
    setAppState,
    windowRefs,
    isUnlocked,
    isCollisionEnabled,
    displayBorder,
    children,
  }: Props,
  ref: ForwardedRef<HTMLDivElement>,
): JSX.Element {
  const [windowState, setWindowState] = useState(widgetState.window);
  const [settingsState, setSettingsState] = useState(widgetState.settings);
  const [, setDimensions] = useState({
    height: window.innerWidth,
    width: window.innerWidth,
  });
  const [isVisible, setIsVisible] = useState<boolean>(windowState.isVisible);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const collisionIsEnabled = isCollisionEnabled;
  const { handleDrag, handleDragStop, handleResize, handleResizeStop } =
    useWindow(windowState, windowRefs, setWindowState, collisionIsEnabled);

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
  
  useEffect(() => {
    function resizeListener() {
      setDimensions({
        width: window.innerHeight,
        height: window.innerHeight,
      });
    }
    
    window.addEventListener('resize', resizeListener);

    return () => window.removeEventListener('resize', resizeListener);
  }, []);

  const SettingsComponent = settingsMap[name as keyof typeof settingsMap];
  const initialX = window.innerWidth / 2 - windowState.size.width / 2;
  console.log('rendered');
  return (
    <>
      <div className={styles.container} ref={ref}>
        <Rnd
          position={{
            x: windowState.position.x || initialX, 
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
              setSettingsIsOpen={setIsSettingsOpen}
              settingsIsOpen={isSettingsOpen}
            >
              {capitalize(name)}
            </TitleBar>
          )}
          <div
            className={styles.children}
            style={{
              border: displayBorder ? '1px solid black' : 'none',
              borderRadius: isUnlocked ? '0 0 1rem 1rem' : '1rem',
            }}
          >
            {children}
          </div>
        </Rnd>
      </div>
      {isSettingsOpen && (
        <SettingsLayout name={name} setIsVisible={setIsSettingsOpen}>
          <SettingsComponent
            settingsState={settingsState}
            setSettingsState={setSettingsState}
            setWindowState={setWindowState}
          />
        </SettingsLayout>
      )}
    </>
  );
}

export default forwardRef(Window);
