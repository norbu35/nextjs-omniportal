import Image, { StaticImageData } from "next/legacy/image";
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

interface WeatherMappings {
  [key: number]: {
    icon: string;
    img?: {
      d: StaticImageData;
      n: StaticImageData;
    };
  };
}

function getWeatherIconBg(
  weatherCode: number,
  isLarge: boolean,
  time: string = '2023-04-20T12:00',
): WeatherIconBgImg {
  if (!weatherCode) {
    return { weatherIcon: null, weatherBgImg: undefined };
  }
  const hourOfDay = parseInt(time.split('T')[1].split(':')[0]);
  const timeOfDay = hourOfDay > 20 || hourOfDay < 6 ? 'n' : 'd';
  const iconSize = isLarge ? '@2x' : '';

  const weatherMappings: WeatherMappings = {
    // Clear
    0: {
      icon: '01',
      img: { d: clearDay, n: clearNight },
    },
    // Mainly clear
    1: { icon: '02', img: { d: mainlyClearDay, n: mainlyClearNight } },
    // Partly cloudy
    2: { icon: '03', img: { d: partlyCloudyDay, n: partlyCloudyNight } },
    // Overcast
    3: { icon: '04', img: { d: overcastDay, n: overcastNight } },
    // Rain showers: slight, moderate, violent
    80: { icon: '09' },
    81: { icon: '09' },
    82: { icon: '09' },
    // Rain: slight, moderate, violent
    61: { icon: '10' },
    62: { icon: '10' },
    63: { icon: '10' },
    // Snow
    85: { icon: '13' },
    86: { icon: '13' },
    // Thunderstorm
    95: { icon: '11' },
    96: { icon: '11' },
    99: { icon: '11' },
    // Snow fall: Slight, moderate, heavy, snow grains
    71: { icon: '11' },
    73: { icon: '11' },
    75: { icon: '11' },
    77: { icon: '11' },
    // Fog and rime fog
    45: { icon: '50' },
    48: { icon: '50' },
  };

  const weatherMapping = weatherMappings[weatherCode];
  const weatherBgImg = weatherMapping.img
    ? weatherMapping.img[timeOfDay]
    : clearDay;
  const iconCode = weatherMapping.icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}${timeOfDay}${iconSize}.png`;
  const weatherIcon = (
    <Image
      width={isLarge ? 100 : 50}
      height={isLarge ? 100 : 50}
      className={styles.weatherIcon}
      src={iconUrl}
      alt="weather icon"
    />
  );

  return { weatherIcon, weatherBgImg };
}

export default getWeatherIconBg;
