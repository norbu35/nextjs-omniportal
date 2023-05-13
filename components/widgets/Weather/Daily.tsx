import { WeatherData } from './types';
import styles from './Daily.module.css';
import getWeatherIconBg from './getWeatherIconBg';

interface Props {
  weatherData: WeatherData;
}
export default function Daily({ weatherData }: Props) {
  const date = new Date();
  const today = date.getDay();
  const days = weatherData.daily.time;
  const codes = weatherData.daily.weathercode;
  const temperatures = [];
  for (let i = 0; i < days.length; i++) {
    const daily = [];
    daily.push(weatherData.daily.temperature_2m_max[i]);
    daily.push(weatherData.daily.temperature_2m_min[i]);
    temperatures.push(daily);
  }

  function getWeekday(day: number) {
    let weekday;

    switch (day) {
      case 0:
        weekday = 'Sunday';
        break;
      case 1:
        weekday = 'Monday';
        break;
      case 2:
        weekday = 'Tuesday';
        break;
      case 3:
        weekday = 'Wednesday';
        break;
      case 4:
        weekday = 'Thursday';
        break;
      case 5:
        weekday = 'Friday';
        break;
      case 6:
        weekday = 'Saturday';
        break;
    }

    return weekday;
  }

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <tbody>
          <tr className={styles.row}>
            {days.map((e, i) => {
              return (
                <td
                  className={styles.day}
                  key={e}
                  style={{
                    color: i === 0 ? '#063970' : undefined,
                  }}
                >
                  {i === 0 ? 'Today' : getWeekday((today + i) % 7)}
                </td>
              );
            })}
          </tr>
          <tr className={styles.row}>
            {codes.map((e: number, i: number) => {
              return (
                <td className={styles.code} key={i}>
                  {getWeatherIconBg(e, false).weatherIcon}
                </td>
              );
            })}
          </tr>
          <tr className={styles.temperature}>
            {temperatures.map((e) => {
              return (
                <td className={styles.column} key={e[0] - e[1]}>
                  {e[0]}° &nbsp; {e[1]}°
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
