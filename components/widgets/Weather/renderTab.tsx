import { Daily } from './Daily';
import { Hourly } from './Hourly';
import { Precipitation } from './Precipitation';

import { WeatherData } from './types';

function renderTab(
  activeView: string,
  weatherData: WeatherData,
): React.ReactNode {
  let tabElement;

  switch (activeView) {
    case 'hourly':
      return <Hourly weatherData={weatherData} />;

    case 'daily':
      return <Daily weatherData={weatherData} />;

    case 'precipitation':
      return <Precipitation weatherData={weatherData} />;
  }
  return tabElement;
}

export { renderTab };
