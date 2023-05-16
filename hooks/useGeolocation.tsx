import { useState, useEffect } from 'react';

export interface GeolocationState {
  position: GeolocationCoordinates | null;
  error: Error | null;
}

const useGeolocation = (): GeolocationState => {
  const [position, setPosition] = useState<GeolocationCoordinates | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const handleSuccess = (geoPosition: GeolocationPosition) => {
      setPosition(geoPosition.coords);
    };

    const handleError = (geoError: GeolocationPositionError) => {
      setError(Error(geoError.message));
    };

    if (!navigator.geolocation) {
      setError(Error('Geolocation is not supported by your browser'));
    } else {
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    }
  }, []);

  return { position, error };
};

export { useGeolocation };
