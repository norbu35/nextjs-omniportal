import { useEffect, useState } from 'react';
import { WeatherData } from './types';

interface Options {
  latitude: number;
  longitude: number;
  daily: string[];
  timezone: string;
  current_weather: boolean;
}

export default function useWeatherData(
  position: GeolocationCoordinates | null,
): {
    data: WeatherData | null;
    error: Error | null;
  } {
  const [data, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'https://api.open-meteo.com/v1/forecast';
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const options = {
          longitude: position?.longitude.toString(),
          latitude: position?.latitude.toString(),
          daily: [
            'temperature_2m_max',
            'temperature_2m_min',
            'precipitation_probability_mean',
            'precipitation_sum',
            'weathercode',
          ],
          hourly: [
            'temperature_2m',
            'precipitation_probability',
            'weathercode',
          ],

          timezone,
          current_weather: true,
        };

        const params = new URLSearchParams();
        for (const k in options) {
          params.append(`${k}`, `${options[k as keyof Options]}`);
        }
        const response = await fetch(`${url}?${params.toString()}`);
        if (!response.ok) {
          throw Error('Error fetching weather data from API');
        }
        const fetchedData = await response.json();
        setWeatherData(fetchedData);
      } catch (err) {
        if (err instanceof Error) setError(err);
      }
    };

    fetchData();
  }, [position]);

  return { data, error };
}
