const API_URL = 'https://api.spotify.com/v1/me/player/currently-playing';

export const getCurrentlyPlaying = async (token: string) => {
  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    throw new Error('Unauthorized');
  }

  if (response.status === 204) {
    throw new Error('No content');
  }

  const data = await response.json();
  return data;
};
