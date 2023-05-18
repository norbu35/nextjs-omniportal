'use client';
import { useState } from 'react';
import { Box } from '../Box/Box';
import { Search } from '@/components/widgets/Search/Search';
import { Weather } from '@/components/widgets/Weather/Weather';

import { WidgetStates } from '../types';
import styles from './Widgets.module.scss';

import initialStates from './states.json';

function Widgets(): JSX.Element {
  const [states, setStates] = useState<WidgetStates>(initialStates);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);

  return (
    <section className={styles.container}>
      <Box heading="Weather" state={states.weather} isUnlocked={isUnlocked}>
        <Weather />
      </Box>
      <Box heading="Search" state={states.search} isUnlocked={isUnlocked}>
        <Search />
      </Box>
    </section>
  );
}

export { Widgets };
export default Widgets;
