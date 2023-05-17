import { WeatherData } from './types';
import styles from './Tab.module.scss';
import { getWeatherIconBg } from './getWeatherIconBg';
import toIsoString from '../../../utils/date/toIsoString';

interface Props {
  weatherData: WeatherData;
}

function HeadingCell({ date }: { date: Date }) {
  return (
    <td className={styles.heading}>
      {date.getHours() < 10
        ? `0${date.getHours()}:00`
        : `${date.getHours()}:00`}
    </td>
  );
}

function IconCell({ date, code }: { date: Date; code: number }) {
  const isoDate = toIsoString(date);
  return (
    <td className={styles.icon}>
      {getWeatherIconBg(code, false, isoDate).weatherIcon}
    </td>
  );
}

function TemperatureCell({ temp }: { temp: number }) {
  return <td className={styles.data}>{temp}°</td>;
}

function PrecipitationCell({ precip }: { precip: number }) {
  return <td className={styles.data}>{precip}%</td>;
}

function Hourly({ weatherData }: Props) {
  const { hourly } = weatherData;
  const currentDate = new Date();
  const hourlyTemps = hourly.time
    .map<[Date, number, number, number]>((time, index) => [
    new Date(time),
    hourly.temperature_2m[index],
    hourly.precipitation_probability[index],
    hourly.weathercode[index],
  ])
    .filter(([date]) => date >= currentDate)
    .slice(0, 14)
    .filter((_, index) => index % 2 === 0);

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.row}>
            {hourlyTemps.map(([date], index) => (
              <HeadingCell key={index} date={date} />
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className={styles.row}>
            {hourlyTemps.map(([date, , , code], i: number) => (
              <IconCell key={i} date={date} code={code} />
            ))}
          </tr>
          <tr className={styles.row}>
            {hourlyTemps.map(([, temp, ,], i: number) => (
              <TemperatureCell key={i} temp={temp} />
            ))}
          </tr>
          <tr className={styles.row}>
            {hourlyTemps.map(([, , precip], i: number) => (
              <PrecipitationCell key={i} precip={precip} />
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export { Hourly };
