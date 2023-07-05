import Search from '@/components/widgets/Search/Search';
import Weather from '@/components/widgets/Weather/Weather';
import Clock from '@/components/widgets/Clock/Clock';
import Motd from '@/components/widgets/Motd/Motd';
import Storage from '@/components/widgets/Storage/Storage';

const widgetsMap = {
  weather: Weather,
  search: Search,
  clock: Clock,
  motd: Motd,
  storage: Storage,
};

export default widgetsMap;
