'use client';

import { useEffect, useRef, useState } from 'react';
import Window from 'components/layout/Window/Window';
import Settings from './SettingsLayout';
import WidgetsPanel from './WidgetsPanel';
import WidgetsSettings from './WidgetsSettings';
import widgetsMap from './widgetsMap';
import { AppState } from '../types';
import styles from './Widgets.module.scss';
import defaultImg from '/public/widgets/Banner/banner.jpg';
import defaultConfig from '@/data/widgets/config.json';

const getStateFromStorage = (key: string, defaultVal: AppState) => {
  const stored = localStorage.getItem(key);
  if (!stored) return defaultVal;
  return JSON.parse(stored);
};
function Widgets(): JSX.Element {
  const [appState, setAppState] = useState(
    getStateFromStorage('portalState', defaultConfig),
  );
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [background] = useState(defaultImg);
  const windowRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    localStorage.setItem('portalState', JSON.stringify(appState));
  }, [appState]);

  function addWindowRef(ref: HTMLDivElement) {
    if (ref && !windowRefs.current.includes(ref)) {
      windowRefs.current.push(ref);
    }
  }

  return (
    <section
      className={styles.container}
      style={{ background: `url(${background.src})` }}
    >
      <div className={styles.widgetsPanel}>
        <WidgetsPanel
          lock={[isUnlocked, () => setIsUnlocked(!isUnlocked)]}
          setSettingsIsOpen={() => setIsSettingsOpen(!isSettingsOpen)}
        />
      </div>
      {isSettingsOpen && (
        <div className={styles.widgetSettings}>
          <Settings name="Widgets" setIsVisible={setIsSettingsOpen}>
            <WidgetsSettings
              state={[appState, setAppState]}
              lock={[isUnlocked, () => setIsUnlocked(!isUnlocked)]}
            />
          </Settings>
        </div>
      )}
      {Object.keys(appState.widgets).map((key) => {
        if (appState.widgets[key].window.isVisible) {
          const Widget = widgetsMap[key as keyof typeof widgetsMap];
          const widgetState = appState.widgets[key];
          return (
            <Window
              name={key}
              widgetState={widgetState}
              setAppState={setAppState}
              isUnlocked={isUnlocked}
              isCollisionEnabled={appState.global.enableCollision}
              displayBorder={appState.global.displayBorder}
              windowRefs={windowRefs.current}
              ref={addWindowRef}
              key={key}
            >
              <Widget state={appState.widgets[key]} />
            </Window>
          );
        }
      })}
    </section>
  );
}

export default Widgets;
