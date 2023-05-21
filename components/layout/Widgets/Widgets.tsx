'use client';

import { useEffect, useRef, useState } from 'react';

import defaultState from './state.json';
import { WidgetStates } from '../types';

import componentsMap from './componentsMap';
import styles from './Widgets.module.scss';
import Window from 'components/Window/Window';

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
    initialState = defaultState;
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
        if (state[key].isVisible) {
          const Component = componentsMap[key as keyof typeof componentsMap];
          return (
            <Window
              name={key}
              state={state[key]}
              setGlobalState={setState}
              ref={addWindowRef}
              windowRefs={windowRefs.current}
              isUnlocked={isUnlocked}
              key={key}
            >
              <Component />
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
