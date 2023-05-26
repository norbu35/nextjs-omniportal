'use client';

import { useEffect, useRef, useState } from 'react';
import Window from 'components/layout/Window/Window';
import Settings from './SettingsLayout';
import WidgetsPanel from './WidgetsPanel';
import WidgetsSettings from './WidgetsSettings';
import widgetsMap from './widgetsMap';
import { AppState } from '../types';
import styles from './Widgets.module.scss';
import defaultConfig from '@/data/widgets/config.json';

const getJSONFromStorage = (key: string, defaultVal: AppState) => {
  if (globalThis.window) return defaultVal;
  const stored = localStorage.getItem(key);
  if (!stored) return defaultVal;
  return JSON.parse(stored);
};


function Widgets(): JSX.Element {
  const [appState, setAppState] = useState<AppState>(
    getJSONFromStorage('portal_state', defaultConfig),
  );
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [settingsIsOpen, setSettingsIsOpen] = useState<boolean>(false);

  const windowRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    localStorage.setItem('portal_state', JSON.stringify(appState));
  }, [appState]);

  function addWindowRef(ref: HTMLDivElement) {
    if (ref && !windowRefs.current.includes(ref)) {
      windowRefs.current.push(ref);
    }
  }

  function setCollisionIsActive() {
    setAppState((prevState) => ({
      ...prevState,
      global: {
        ...prevState.global,
        isCollision: !prevState.global.isCollision,
      },
    }));
  }

  function setIsBorder() {
    setAppState((prevState) => ({
      ...prevState,
      global: {
        ...prevState.global,
        isBorder: !prevState.global.isBorder,
      },
    }));
  }

  return (
    <section className={styles.container}>
      <div className={styles.widgetsPanel}>
        <WidgetsPanel
          lock={[isUnlocked, setIsUnlocked ]}
          setSettingsIsOpen={() => setSettingsIsOpen(!settingsIsOpen)}
        />
      </div>
      {settingsIsOpen && (
        <div className={styles.widgetSettings}>
          <Settings name="Widgets" setIsVisible={setSettingsIsOpen}>
            <WidgetsSettings
              state={[appState, setAppState]}
              lock={[isUnlocked, () => setIsUnlocked(!isUnlocked)]}
              collision={[appState.global.isCollision, setCollisionIsActive]}
              border={[appState.global.isBorder, setIsBorder]}
            />
          </Settings>
        </div>
      )}
      {Object.keys(appState.widgets).map((key) => {
        if (appState.widgets[key].window.isVisible) {
          const Widget = widgetsMap[key as keyof typeof widgetsMap];
          return (
            <Window
              name={key}
              widgetState={appState.widgets[key]}
              setAppState={setAppState}
              ref={addWindowRef}
              windowRefs={windowRefs.current}
              isUnlocked={isUnlocked}
              collisionIsActive={appState.global.isCollision}
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

export { Widgets };
export default Widgets;
