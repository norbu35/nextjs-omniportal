'use client';

import { useEffect, useRef, useState } from 'react';
import Box from '../Box/Box';
import { Search } from '@/components/widgets/Search/Search';
import { Weather } from '@/components/widgets/Weather/Weather';

import { WidgetStates } from '../types';
import styles from './Widgets.module.scss';

import defaultState from './state.json';

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
  const boxRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    console.log('widget storage: ', state.weather.position);
    localStorage.setItem('portal_state', JSON.stringify(state));
  }, [state]);

  function addBoxRef(ref: HTMLDivElement) {
    if (ref && !boxRefs.current.includes(ref)) {
      console.log(ref);
      boxRefs.current.push(ref);
    } 
  }

  return (
    <section className={styles.container}>
      <Box
        ref={addBoxRef}
        boxRefs={boxRefs.current}
        name="weather"
        state={state}
        isUnlocked={isUnlocked}
        setStates={setState}
      >
        <Weather />
      </Box>
      <Box
        ref={addBoxRef}
        boxRefs={boxRefs.current}
        name="search"
        state={state}
        setStates={setState}
        isUnlocked={isUnlocked}
      >
        <Search />
      </Box>
    </section>
  );
}

export { Widgets };
export default Widgets;
