import { useEffect, useState } from 'react';

interface iCoords {
  coords: {
    latitude: number;
    longitude: number;
  };
}

interface UsePosition {
  error: string;
  latitude: number;
  longitude: number;
}

export const usePosition = (): UsePosition => {
  const [position, setPosition] = useState({});
  const [error, setError] = useState('');

  const onChange = ({ coords }: iCoords) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude
    });
  };
  const onError = (error: { message: string }) => {
    setError(error.message);
  };
  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError('Geolocation is not supported');
      return;
    }
    geo.getCurrentPosition(onChange, onError);
  }, []);
  return { ...position, error } as UsePosition;
};
