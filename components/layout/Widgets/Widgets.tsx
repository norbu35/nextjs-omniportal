import Weather from '@/components/widgets/Weather/Weather';
import Box from '../Box/Box';
import Search from '@/components/widgets/Search/Search';

export default function Widgets(): JSX.Element {
  return (
    <section>
      <Box heading="Weather">
        <Weather />
      </Box>
      <Box heading="Search">
        <Search />
      </Box>
    </section>
  );
}
