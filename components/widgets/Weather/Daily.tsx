import { WeatherData } from './types';
import { getWeatherIconBg } from './getWeatherIconBg';
import styles from './Tab.module.scss';
import toIsoString from '@/utils/date/toIsoString';

interface Props {
  weatherData: WeatherData;
}

function HeadingCell({ date }: { date: Date }): JSX.Element {
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date().getDay();
  return (
    <td className={styles.heading}>
      {date.getDay() === today ? 'Today' : weekdays[date.getDay()]}
    </td>
  );
}

function IconCell({ date, code }: { date: Date; code: number }): JSX.Element {
  const isoDate = toIsoString(date);
  return (
    <td className={styles.icon}>
      {getWeatherIconBg(code, false, isoDate)?.weatherIcon}
    </td>
  );
}

function TemperatureCell({ temp }: { temp: number }): JSX.Element {
  return <td className={styles.data}>{temp}°</td>;
}

function Daily({ weatherData }: Props): JSX.Element {
  const { daily } = weatherData;
  const dailyTemps = daily.time.map<[Date, number, number, number]>(
    (day, index) => [
      new Date(day),
      daily.temperature_2m_max[index],
      daily.temperature_2m_min[index],
      daily.weathercode[index],
    ],
  );

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.row}>
            {dailyTemps.map(([date], index) => (
              <HeadingCell date={date} key={index} />
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className={styles.row}>
            {dailyTemps.map(([date, , , code], index) => (
              <IconCell date={date} code={code} key={index} />
            ))}
          </tr>
          <tr className={styles.row}>
            {dailyTemps.map(([, temp], index) => (
              <TemperatureCell temp={temp} key={index} />
            ))}
          </tr>
          <tr className={styles.row}>
            {dailyTemps.map(([, , temp], index) => (
              <TemperatureCell temp={temp} key={index} />
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export { Daily };
