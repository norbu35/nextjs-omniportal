import { useState, useEffect } from 'react';

const useGeocode = (position: GeolocationCoordinates | null) => {
  const [geocodeResult, setGeocodeResult] =
    useState<google.maps.GeocoderResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!position) return;

    const fetchData = async () => {
      const latitude = position?.latitude;
      const longitude = position?.longitude;
      const apiKey = process.env.NEXT_PUBLIC_MAPS_API;
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw Error('Error fetching from Google Maps API');
        }
        const data = await response.json();
        setGeocodeResult(data);
      } catch (err) {
        if (err instanceof Error) setError(err);
      }
    };

    if (position) {
      fetchData();
    }
  }, [position]);

  return { geocodeResult, error };
};

export { useGeocode };
