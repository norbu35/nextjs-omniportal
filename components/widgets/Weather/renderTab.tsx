import Daily from './Daily';
import Hourly from './Hourly';
import Precipitation from './Precipitation';

import { WeatherData } from './types';

function renderTab(
  activeTab: string,
  weatherData: WeatherData,
): React.ReactNode {
  switch (activeTab) {
    case 'hourly':
      return <Hourly weatherData={weatherData} />;
    case 'daily':
      return <Daily weatherData={weatherData} />;
    case 'precipitation':
      return <Precipitation weatherData={weatherData} />;
  }
}

export default renderTab;
