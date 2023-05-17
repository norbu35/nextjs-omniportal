'use client';

import { Box } from '../Box/Box';

import { Search } from '@/components/widgets/Search/Search';
import { Weather } from '@/components/widgets/Weather/Weather';

import styles from './Widgets.module.scss';

function Widgets(): JSX.Element {

  return (
    <section className={styles.container}>
        <Box heading="Weather">
          <Weather />
        </Box>
      <Box heading="Search">
        <Search />
      </Box>
    </section>
  );
}

export { Widgets };
export default Widgets;
