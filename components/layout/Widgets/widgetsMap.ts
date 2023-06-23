import Search from '@/components/widgets/Search/Search';
import Weather from '@/components/widgets/Weather/Weather';
import Clock from '@/components/widgets/Clock/Clock';
import Motd from '@/components/widgets/Motd/Motd';

const widgetsMap = {
  weather: Weather,
  search: Search,
  clock: Clock,
  motd: Motd,
};

export default widgetsMap;
