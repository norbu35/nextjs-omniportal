'use client';

import { useEffect, useRef, useState } from 'react';

import Window from 'components/layout/Window/Window';

import { WidgetStates } from '../types';
import widgetsMap from './widgetsMap';
import styles from './Widgets.module.scss';
import defaultConfig from '@/data/widgets/config.json';

interface Props {
  isUnlocked: boolean;
}

function Widgets({ isUnlocked }: Props): JSX.Element {
  let initialState;
  let storedState;
  if (typeof window !== 'undefined') {
    storedState = localStorage.getItem('portal_state');
  }
  if (storedState) {
    initialState = JSON.parse(storedState);
  } else {
    initialState = defaultConfig;
  }
  const [state, setState] = useState<WidgetStates>(initialState);
  const windowRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    localStorage.setItem('portal_state', JSON.stringify(state));
  }, [state]);

  function addWindowRef(ref: HTMLDivElement) {
    if (ref && !windowRefs.current.includes(ref)) {
      windowRefs.current.push(ref);
    }
  }
  
  return (
    <section className={styles.container}>
      {Object.keys(state).map((key) => {
        if (state[key].window.isVisible) {
          const Widget = widgetsMap[key as keyof typeof widgetsMap];

          return (
            <Window
              name={key}
              state={state[key]}
              setState={setState}
              ref={addWindowRef}
              windowRefs={windowRefs.current}
              isUnlocked={isUnlocked}
              key={key}
            >
              <Widget state={state[key]} />
            </Window>
          );
        }
        return null;
      })}
    </section>
  );
}

export { Widgets };
export default Widgets;
