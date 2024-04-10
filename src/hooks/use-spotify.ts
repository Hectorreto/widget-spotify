import { useCallback, useEffect, useState } from 'react';
import { getCurrentlyPlaying } from '../api/get-currently-playing';
import { getRefreshToken } from '../api/get-refresh-token';

export const useSpotify = () => {
  const [artist, setArtist] = useState('');
  const [song, setSong] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [token, setToken] = useState<string>();

  const saveToken = (value: string) => {
    setToken(value);
    localStorage.setItem('token', value);
  };

  useEffect(() => {
    const oldToken = localStorage.getItem('token');
    if (oldToken) {
      setToken(oldToken);
    }
  }, []);

  const updateData = useCallback(async () => {
    if (!token) return;
    try {
      const data = await getCurrentlyPlaying(token);
      const artists = data.item.artists;
      if (Array.isArray(artists)) {
        const names = artists.map(artist => artist.name);
        setArtist(names.join(', '));
      }

      setSong(data.item.name);
      setImageUrl(data.item.album.images[1].url);
    }
    catch (error) {
      if (error instanceof Response) {
        if (error.status >= 400 && error.status < 500) {
          return getRefreshToken().then(saveToken);
        }
      }
      console.error(error);
    }
  }, [token]);

  useEffect(() => {
    const interval = setInterval(updateData, 10000);
    return () => {
      clearInterval(interval);
    };
  }, [updateData]);

  return { imageUrl, artist, song };
};
