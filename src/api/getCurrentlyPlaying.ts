const endpoint = 'https://api.spotify.com/v1/me/player/currently-playing'

export const getCurrentlyPlaying = async (token: string) => {
  const response = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
  if (response.status < 200 || response.status >= 300) {
    throw new Error(`${response.status}`);
  }
  const data = await response.json();
  return data;
}

