import { useCallback, useEffect, useState } from 'react';
import { getCurrentlyPlaying } from './api/getCurrentlyPlaying';
import { getRefreshToken } from './api/getRefreshToken';

export const App = () => {
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
      if (error instanceof Error) {
        if (error.message.startsWith('4')) {
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

  return (
    <main className="min-h-screen flex justify-center items-center">
      <div className="flex gap-8 bg-blue-950 bg-opacity-40 p-6 rounded-3xl text-pretty shadow-md min-w-[800px]">
        <div className="w-[200px] h-[200px] rounded-[25px] shadow-2xl overflow-hidden">
          <img src={imageUrl} className="w-full h-full object-cover" alt="Song Image" />
        </div>
        <div className="flex-1 flex flex-col">
          <p className="text-gray-400 text-[35px]">{artist}</p>
          <p className="text-gray-50 text-[35px]">{song}</p>
          <div className="flex-1 flex items-center">
            <div className="bg-gradient-to-r from-green-600 to-purple-600 rounded-full h-[8px] w-full"></div>
          </div>
        </div>
      </div>
    </main>
  );
};
