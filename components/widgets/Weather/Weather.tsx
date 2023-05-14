'use client';

import { useState, useEffect, ReactNode } from 'react';
import { StaticImageData } from 'next/image';
import { WeatherData } from './types';
import styles from './Weather.module.scss';

import useGeolocation from '@/hooks/useGeolocation';
import useGeocode from '@/hooks/useGeocode';

import getWeatherIconBg from './getWeatherIconBg';
import getWeatherData from './getWeatherData';
import renderTab from './renderTab';

export default function Weather(): JSX.Element {
  const [position, setPosition] = useState<GeolocationCoordinates | null>(null);
  const [geocode, setGeocode] = useState<google.maps.GeocoderResponse | null>(
    null,
  );
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  const [currentWeatherIcon, setCurrentWeatherIcon] =
    useState<ReactNode | null>(null);
  const [currentWeatherBgImg, setCurrentWeatherBgImg] =
    useState<StaticImageData | null>(null);

  const [activeView, setActiveView] = useState<string>('hourly');

  const { position: geoPosition, error: geoLocationError } = useGeolocation();
  const { geocodeResult } = useGeocode(position);

  useEffect(() => {
    if (geoLocationError) {
      console.log(geoLocationError);
    }
    setPosition(geoPosition);
  }, [geoPosition, geoLocationError]);

  useEffect(() => {
    setGeocode(geocodeResult);
  }, [geocodeResult]);

  useEffect(() => {
    if (!position) {
      return;
    }

    const fetchData = async () => {
      try {
        const weather = await getWeatherData(position);
        setWeatherData(weather);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [position]);

  useEffect(() => {
    const { weatherIcon, weatherBgImg } = getWeatherIconBg(
      weatherData?.current_weather.weathercode,
      true,
      weatherData?.current_weather.time,
    );

    setCurrentWeatherIcon(weatherIcon);
    if (weatherBgImg) {
      setCurrentWeatherBgImg(weatherBgImg);
    }
  }, [weatherData]);

  function handleSwitchView(viewType: string) {
    setActiveView(viewType);
  }
  const currentDate = new Date();
  const localDate = currentDate.toLocaleDateString();
  const city = geocode?.results[9].formatted_address.split(',')[0] ?? '';

  if (loading) {
    return <p>Loading weather data...</p>;
  }
  return (
    <>
      {weatherData && weatherData.daily ? (
        <div
          className={styles.container}
          style={{
            backgroundImage: currentWeatherBgImg
              ? `url(${currentWeatherBgImg.src})`
              : 'none',
            backgroundSize: 'cover',
          }}
        >
          <div className={styles.current}>
            <div className={styles.left}>
              <div className={styles.locationDate}>
                <div className={styles.location}>{city}</div>
                <div className={styles.date}>{localDate}</div>
              </div>
              <div className={styles.currentConditions}>
                {currentWeatherIcon}
                <div className={styles.conditionDescription}></div>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.currentTemp}>
                {weatherData.current_weather.temperature}°
              </div>
              <div className={styles.minMaxTemp}>
                {weatherData.daily.temperature_2m_max[0]}° /&nbsp;
                {weatherData.daily.temperature_2m_min[0]}°
              </div>
              <div className={styles.wind}></div>
            </div>
          </div>
          <div className={styles.forecast}>
            <ul className={styles.tabsNav}>
              <li
                className={
                  activeView === 'hourly'
                    ? `${styles.tabActive} ${styles.tabButton}`
                    : `${styles.tabButton}`
                }
                onClick={() => handleSwitchView('hourly')}
              >
                Hourly
              </li>
              <li
                className={
                  activeView === 'daily'
                    ? `${styles.tabActive} ${styles.tabButton}`
                    : `${styles.tabButton}`
                }
                onClick={() => handleSwitchView('daily')}
              >
                Daily
              </li>
              <li
                className={
                  activeView === 'precipitation'
                    ? `${styles.tabActive} ${styles.tabButton}`
                    : `${styles.tabButton}`
                }
                onClick={() => handleSwitchView('precipitation')}
              >
                Precipitation
              </li>
            </ul>
            <div className={styles.tab}>
              {renderTab(activeView, weatherData)}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
