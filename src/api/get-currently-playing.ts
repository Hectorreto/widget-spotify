const API_URL = 'https://api.spotify.com/v1/me/player/currently-playing';

export const getCurrentlyPlaying = async (token: string) => {
  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const contentType = response.headers.get('Content-Type');
  if (!response.ok || !contentType?.includes('application/json')) {
    throw response;
  }

  const data = await response.json();
  return data;
};
