import Image, { StaticImageData } from 'next/image';
import clearDay from '/public/widgets/Weather/clear-day.jpg';
import clearNight from '/public/widgets/Weather/clear-night.jpg';
import mainlyClearDay from '/public/widgets/Weather/mainly-clear-day.jpg';
import mainlyClearNight from '/public/widgets/Weather/mainly-clear-night.jpg';
import partlyCloudyDay from '/public/widgets/Weather/partly-cloudy-day.jpg';
import partlyCloudyNight from '/public/widgets/Weather/partly-cloudy-night.jpg';
import overcastDay from '/public/widgets/Weather/overcast-day.jpg';
import overcastNight from '/public/widgets/Weather/overcast-night.jpg';

import styles from './Weather.module.scss';

interface WeatherIconBgImg {
  weatherIcon: React.ReactNode | null;
  weatherBgImg: StaticImageData | undefined;
}

function getWeatherIconBg(
  weatherCode: number,
  isLarge: boolean,
  time: string = '2023-04-20T12:00',
): WeatherIconBgImg {
  if (!weatherCode) {
    return { weatherIcon: null, weatherBgImg: undefined };
  }

  const hour = parseInt(time.split('T')[1].split(':')[0]);
  const timeOfDay = hour > 20 || hour < 6 ? 'n' : 'd';
  const iconUrl = 'https://openweathermap.org/img/wn/';
  const size = isLarge ? '@2x' : '';
  let weatherBgImg;
  let weatherIcon;

  switch (weatherCode) {
    // Clear
    case 0:
      weatherIcon = (
        <Image
          width={isLarge ? 100 : 50}
          height={isLarge ? 100 : 50}
          className={styles.weatherIcon}
          src={`${iconUrl}01${timeOfDay}${size}.png`
          }
          alt="weather icon"
        />
      );
      weatherBgImg = timeOfDay === 'd' ? clearDay : clearNight;
      break;
    // Mainly clear
    case 1:
      weatherIcon = (
        <Image
          width={isLarge ? 100 : 50}
          height={isLarge ? 100 : 50}
          className={styles.weatherIcon}
          src={`${iconUrl}02${timeOfDay}${size}.png`
          }
          alt="weather icon"
        />
      );
      weatherBgImg = timeOfDay === 'd' ? mainlyClearDay : mainlyClearNight;
      break;
    // Partly cloudy
    case 2:
      weatherIcon = (
        <Image
          width={isLarge ? 100 : 50}
          height={isLarge ? 100 : 50}
          className={styles.weatherIcon}
          src={`${iconUrl}03${timeOfDay}${size}.png`}
          alt="weather icon"
        />
      );
      weatherBgImg = timeOfDay === 'd' ? partlyCloudyDay : partlyCloudyNight;
      break;
    // Overcast
    case 3:
      weatherIcon = (
        <Image
          width={isLarge ? 100 : 50}
          height={isLarge ? 100 : 50}
          className={styles.weatherIcon}
          src={`${iconUrl}04${timeOfDay}${size}.png`}
          alt="weather icon"
        />
      );
      weatherBgImg = timeOfDay === 'd' ? overcastDay : overcastNight;
      break;
    // Rain showers: slight, moderate, violent
    case 80:
    case 81:
    case 82:
      weatherIcon = (
        <Image
          width={isLarge ? 100 : 50}
          height={isLarge ? 100 : 50}
          className={styles.weatherIcon}
          src={`${iconUrl}09${timeOfDay}${size}.png`}
          alt="weather icon"
        />
      );
      break;
    // Rain: slight, moderate, violent
    case 61:
    case 63:
    case 65:
      weatherIcon = (
        <Image
          width={isLarge ? 100 : 50}
          height={isLarge ? 100 : 50}
          className={styles.weatherIcon}
          src={`${iconUrl}10${timeOfDay}${size}.png`}
          alt="weather icon"
        />
      );
      break;
    // Snow
    case 85:
    case 86:
      weatherIcon = (
        <Image
          width={isLarge ? 100 : 50}
          height={isLarge ? 100 : 50}
          className={styles.weatherIcon}
          src={`${iconUrl}13${timeOfDay}${size}.png`}
          alt="weather icon"
        />
      );
    // Thunderstorm
    case 95:
    case 96:
    case 99:
      weatherIcon = (
        <Image
          width={isLarge ? 100 : 50}
          height={isLarge ? 100 : 50}
          className={styles.weatherIcon}
          src={`${iconUrl}11${timeOfDay}${size}.png`}
          alt="weather icon"
        />
      );
    // Snow fall: Slight, moderate, heavy, snow grains
    case 71:
    case 73:
    case 75:
    case 77:
      weatherIcon = (
        <Image
          width={isLarge ? 100 : 50}
          height={isLarge ? 100 : 50}
          className={styles.weatherIcon}
          src={`${iconUrl}11${timeOfDay}${size}.png`}
          alt="weather icon"
        />
      );
      break;
    // Fog and rime fog
    case 45:
    case 48:
      weatherIcon = (
        <Image
          width={isLarge ? 100 : 50}
          height={isLarge ? 100 : 50}
          className={styles.weatherIcon}
          src={`${iconUrl}50${timeOfDay}${size}.png`}
          alt="weather icon"
        />
      );
      break;
  }

  return { weatherIcon, weatherBgImg };
}

export default getWeatherIconBg;
