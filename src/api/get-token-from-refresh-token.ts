const API_URL = 'https://accounts.spotify.com/api/token';
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

export const getTokenFromRefreshToken = async (refreshToken: string) => {
  if (!CLIENT_ID || !CLIENT_SECRET) return;
  const authorization = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${authorization}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: CLIENT_ID,
    }),
  });
  const data = await response.json();
  return data.access_token;
};
