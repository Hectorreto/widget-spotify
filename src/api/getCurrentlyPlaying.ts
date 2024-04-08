const endpoint = 'https://api.spotify.com/v1/me/player/currently-playing'

export const getCurrentlyPlaying = async (token: string) => {
  try {
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error)
  }
}

