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
  const [settingsIsOpen, setSettingsIsOpen] = useState<boolean>(false);
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
    <section className={styles.container}>
      <div className={styles.widgetsPanel}>
        <WidgetsPanel
          lock={[isUnlocked, () => setIsUnlocked(!isUnlocked)]}
          setSettingsIsOpen={() => setSettingsIsOpen(!settingsIsOpen)}
        />
      </div>
      {settingsIsOpen && (
        <div className={styles.widgetSettings}>
          <Settings name="Widgets" setIsVisible={setSettingsIsOpen}>
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
          return (
            <Window
              name={key}
              widgetState={appState.widgets[key]}
              setAppState={setAppState}
              isUnlocked={isUnlocked}
              isCollision={appState.global.isCollision}
              isBorder={appState.global.isBorder}
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
