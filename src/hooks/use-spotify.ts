import { useCallback, useEffect, useState } from 'react';
import { getCurrentlyPlaying } from '../api/get-currently-playing';
import { getTokenFromCode } from '../api/get-token-from-code';

export const useSpotify = () => {
  const [artist, setArtist] = useState('');
  const [song, setSong] = useState('');
  const [imageUrl, setImageUrl] = useState('/loading.svg');
  const [token, setToken] = useState<string>();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (code && state) {
      localStorage.setItem('code', code);
      localStorage.setItem('state', state);
    }
  }, []);

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
    try {
      if (!token) throw new Error('Unauthorized');

      const data = await getCurrentlyPlaying(token);
      const artists = data.item.artists;
      if (Array.isArray(artists)) {
        const names = artists.map((artist) => artist.name);
        setArtist(names.join(', '));
      }

      setSong(data.item.name);
      setImageUrl(data.item.album.images[1].url);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Unauthorized') {
          const code = localStorage.getItem('code');
          if (!code) return;

          getTokenFromCode(code)
            .then((token) => saveToken(token));

          return;
        }
        if (error.message === 'No content') {
          return console.log('Spotify is closed');
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
