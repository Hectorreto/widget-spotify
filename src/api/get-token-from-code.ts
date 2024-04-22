const CLIENT_ID = process.env.CLIENT_ID || '';
const CLIENT_SECRET = process.env.CLIENT_SECRET || '';
const REDIRECT_URL = process.env.REDIRECT_URL || '';
const API_URL = 'https://accounts.spotify.com/api/token';

export const getTokenFromCode = async (code: string) => {
  const authorization = Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64');

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${authorization}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URL,
    }),
  });
  const data = await response.json();

  if ('error' in data) {
    throw data;
  }

  return {
    access_token: String(data.access_token),
    token_type: String(data.token_type),
    expires_in: Number(data.expires_in),
    refresh_token: String(data.refresh_token),
    scope: String(data.scope),
  };
};
