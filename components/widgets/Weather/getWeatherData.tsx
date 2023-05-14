interface Options {
  latitude: number;
  longitude: number;
  daily: string[];
  timezone: string;
  current_weather: boolean;
}

export default async function getWeatherData(position: GeolocationCoordinates) {
  try {
    const url = 'https://api.open-meteo.com/v1/forecast';
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const options = {
      longitude: position.longitude.toString(),
      latitude: position.latitude.toString(),
      daily: ['temperature_2m_max', 'temperature_2m_min', 'weathercode'],
      hourly: ['temperature_2m', 'precipitation_probability', 'weathercode'],
      timezone,
      current_weather: true,
    };

    const params = new URLSearchParams();
    for (const k in options) {
      params.append(`${k}`, `${options[k as keyof Options]}`);
    }

    const response = await fetch(`${url}?${params.toString()}`);
    if (!response.ok) {
      throw new Error('Error fetching data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('failed to fetch weather data');
  }
}
