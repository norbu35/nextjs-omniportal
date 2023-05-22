import Search  from '@/components/widgets/Search/Search';
import Weather  from '@/components/widgets/Weather/Weather';
import Clock from '@/components/widgets/Clock/Clock';

const widgetsMap = {
  weather: Weather,
  search: Search,
  clock: Clock,
};

export { widgetsMap };
export default widgetsMap;
