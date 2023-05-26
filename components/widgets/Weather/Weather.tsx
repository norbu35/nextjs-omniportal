/* eslint-disable import/no-extraneous-dependencies */
'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import { StaticImageData } from 'next/image';
import { WeatherData } from './types';

import { useGeolocation } from '@/hooks/useGeolocation';
import { useGeocode } from '@/hooks/useGeocode';
import { useWeatherData } from './useWeatherData';

import { getWeatherIconBg } from './getWeatherIconBg';
import { renderTab } from './renderTab';
import { Loader } from './Loader';

import { WidgetState } from '@/components/layout/types';
import styles from './Weather.module.scss';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import '@fontsource/inter/200.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  state: WidgetState;
}

function Weather({ state }: Props) {
  const { settings } = state;
  const [error, setError] = useState<Error | null>(null);
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
  const [forecastIsOpen, setForecastIsOpen] = useState<boolean>(true);

  const { position: geoPosition, error: geoLocationError } = useGeolocation();
  const { geocodeResult, error: geocodeError } = useGeocode(position);
  const { data: fetchedWeatherData, error: weatherDataError } =
    useWeatherData(position);

  useEffect(
    () => (geoPosition ? setPosition(geoPosition) : setError(geoLocationError)),
    [geoPosition, geoLocationError],
  );

  useEffect(
    () => (geocodeResult ? setGeocode(geocodeResult) : setError(geocodeError)),
    [geocodeResult, geocodeError],
  );

  useEffect(() => {
    if (fetchedWeatherData) {
      setWeatherData(fetchedWeatherData);
      setError(null);
      setLoading(false);
    } else {
      setError(weatherDataError);
      setLoading(false);
    }
  }, [fetchedWeatherData, weatherDataError]);

  useEffect(() => {
    if (weatherData) {
      const { weatherIcon, weatherBgImg } = getWeatherIconBg(
        weatherData.current_weather.weathercode,
        true,
        weatherData.current_weather.time,
      );

      setCurrentWeatherIcon(weatherIcon);
      if (weatherBgImg) setCurrentWeatherBgImg(weatherBgImg);
    }
  }, [weatherData]);

  function handleSwitchView(viewType: string): void {
    setActiveView(viewType);
  }

  function toggleForecast() {
    setForecastIsOpen(!forecastIsOpen);
  }

  const localDate = new Date().toLocaleDateString();
  const city = geocode?.results[9]?.formatted_address.split(',')[0] ?? '';

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: settings!.bgImg
          ? currentWeatherBgImg
            ? `url(${currentWeatherBgImg.src})`
            : "url('/widgets/Weather/clear-day.jpg')"
          : 'none',
        backgroundPosition: 'center',
        fontSize: (settings!.fontSize / 16).toFixed(3) + 'rem',
        color: settings!.fontColor,
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
            {weatherData?.current_weather.temperature}°
          </div>
          <div className={styles.maxTemp}>
            {weatherData?.daily?.temperature_2m_max[0]}°
          </div>
          <div className={styles.minTemp}>
            {weatherData?.daily?.temperature_2m_min[0]}°
          </div>
          <div className={styles.wind}></div>
        </div>
      </div>
      {forecastIsOpen || (
        <div className={styles.forecastButtonTop} onClick={toggleForecast}>
          <FontAwesomeIcon icon={faAngleDown} />
        </div>
      )}
      {forecastIsOpen && (
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
            {weatherData && renderTab(activeView, weatherData)}
          </div>
        </div>
      )}
      {forecastIsOpen && (
        <div
          className={styles.forecastButtonBottom}
          onClick={toggleForecast}
        >
          <FontAwesomeIcon icon={faAngleDown} />
        </div>
      )}
    </div>
  );
}

export { Weather };
export default Weather;
