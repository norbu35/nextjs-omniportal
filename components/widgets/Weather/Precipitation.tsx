import { WeatherData } from './types';
import styles from './Tab.module.css';

interface Props {
  weatherData: WeatherData;
}

export default function Precipitation({ weatherData }: Props) {
  return <div className={styles.container}></div>;
}
