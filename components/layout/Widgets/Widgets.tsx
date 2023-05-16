import { Box } from '../Box/Box';

import { Search } from '@/components/widgets/Search/Search';
import { Weather } from '@/components/widgets/Weather/Weather';

import styles from './Widgets.module.css';

function Widgets(): JSX.Element {
  return (
    <section className={styles.container}>
      <Box heading="Search">
        <Search />
      </Box>
      <Box heading="Weather">
        <Weather />
      </Box>
    </section>
  );
}

export { Widgets };
