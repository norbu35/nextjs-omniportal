/* eslint-disable import/no-extraneous-dependencies */
'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import { StaticImageData } from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import TabsNav, { TabType } from './renderTabsNav';

import { WeatherData } from './types';
import { WidgetState } from '@/components/layout/types';

import getGeocode from './getGeocode';
import getLocation from './getLocation';
import getWeather from './getWeather';

import getWeatherIconBg from './getWeatherIconBg';
import renderTab from './renderTab';
import Loader from './Loader';

import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import '@fontsource/inter/200.css';
import styles from './Weather.module.scss';
import { WeatherSettings } from '@/components/layout/Window/settingsMap';

interface Props {
  state: WidgetState<WeatherSettings>;
}

export default function Weather({ state }: Props) {
  const { settings } = state;
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('hourly');
  const [displayForecast, setDisplayForecast] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const geoLocation: GeolocationPosition = await getLocation();
        const coords = geoLocation.coords;
        const weatherData = await getWeather(
          coords,
          settings.temperatureUnit.value,
        );
        setWeather(weatherData);
        const geoCode = await getGeocode(coords);
        setCity(geoCode.results[9].formatted_address.split(',')[0]);
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        }
      }
    };

    fetchData();
  });

  let currentWeatherIcon: ReactNode;
  let currentWeatherBgImg: StaticImageData | undefined;

  if (weather) {
    const { weatherIcon, weatherBgImg } = getWeatherIconBg(
      weather.current_weather.weathercode,
      true,
      weather.current_weather.time,
    );
    currentWeatherIcon = weatherIcon;
    currentWeatherBgImg = weatherBgImg;
  }

  function handleSwitchTab(tab: TabType): void {
    setActiveTab(tab);
  }

  function toggleForecast() {
    setDisplayForecast(!displayForecast);
  }

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  const localDate = new Date().toLocaleDateString();

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: settings.backgroundImage.value
          ? currentWeatherBgImg
            ? `url(${currentWeatherBgImg.src})`
            : "url('/widgets/Weather/clear-day.jpg')"
          : 'none',
        backgroundPosition: 'center',
        fontSize: (settings.fontSize.value / 16).toFixed(3) + 'rem',
        color: settings.fontColor.value,
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
            {weather?.current_weather.temperature}°
          </div>
          <div className={styles.maxTemp}>
            {weather?.daily?.temperature_2m_max[0]}°
          </div>
          <div className={styles.minTemp}>
            {weather?.daily?.temperature_2m_min[0]}°
          </div>
          <div className={styles.wind}></div>
        </div>
      </div>
      {displayForecast || (
        <div className={styles.forecastButtonTop} onClick={toggleForecast}>
          <FontAwesomeIcon icon={faAngleDown} />
        </div>
      )}
      {displayForecast && (
        <>
          <div className={styles.forecast}>
            <TabsNav activeTab={activeTab} handleSwitchTab={handleSwitchTab} />
            <div className={styles.tab}>
              {weather && renderTab(activeTab, weather)}
            </div>
          </div>
          <div className={styles.forecastButtonBottom} onClick={toggleForecast}>
            <FontAwesomeIcon icon={faAngleDown} />
          </div>
        </>
      )}
    </div>
  );
}
