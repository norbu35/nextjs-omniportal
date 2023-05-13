import Daily from './Daily';
import Hourly from './Hourly';
import { WeatherData } from './types';

export default function renderTab(
  activeView: string,
  weatherData: WeatherData,
) {
  let tabElement;

  switch (activeView) {
    case 'hourly':
      return <Hourly weatherData={weatherData} />;

    case 'daily':
      return <Daily weatherData={weatherData} />;

    case 'precipitation':
      tabElement = <div>precipitation tab</div>;
  }
  return tabElement;
}
