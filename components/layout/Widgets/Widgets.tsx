'use client';
import { useEffect, useState } from 'react';
import { Box } from '../Box/Box';
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
  const storedState = localStorage.getItem('portal_state');
  if (storedState) {
    initialState = JSON.parse(storedState);
  } else {
    initialState = defaultState;
  }
  const [state, setState] = useState<WidgetStates>(initialState);

  useEffect(() => {
    localStorage.setItem('portal_state', JSON.stringify(state));
  }, [state]);

  return (
    <section className={styles.container}>
      <Box
        name="weather"
        state={state}
        isUnlocked={isUnlocked}
        setStates={setState}
      >
        <Weather />
      </Box>
      <Box
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
