'use client';

import { useEffect, useRef, useState } from 'react';

import Box from '../Box/Box';
import { WidgetStates } from '../types';
import styles from './Widgets.module.scss';

import defaultState from './state.json';
import componentsMap from './componentsMap';

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
  const [states, setStates] = useState<WidgetStates>(initialState);
  const boxRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    localStorage.setItem('portal_state', JSON.stringify(states));
  }, [states]);

  function addBoxRef(ref: HTMLDivElement) {
    if (ref && !boxRefs.current.includes(ref)) {
      boxRefs.current.push(ref);
    }
  }

  return (
    <section className={styles.container}>
      {Object.keys(states).map((key) => {
        if (states[key].isVisible) {
          const Component = componentsMap[key as keyof typeof componentsMap];
          return (
            <Box
              name={key}
              state={states}
              setStates={setStates}
              ref={addBoxRef}
              boxRefs={boxRefs.current}
              isUnlocked={isUnlocked}
              key={key}
            >
              <Component />
            </Box>
          );
        }
        return null;
      })}
    </section>
  );
}

export { Widgets };
export default Widgets;
