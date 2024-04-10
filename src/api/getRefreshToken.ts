const refreshToken = 'AQB-y7JLBnMLoo9yAMTLXrwhXeScv-fpCWjkvJlOQq-3at1653i1pUGjQq7IblFNgE7CYM7AiGapIQUiYkKgNN6XiAoWcPtAcP7q2PtctN7D53pgkPDV59Z7mqqyUtZ_9bQ';
const endpoint = "https://accounts.spotify.com/api/token";
const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

export const getRefreshToken = async () => {
  if (!clientId || !clientSecret) return;
  const authorization = btoa(`${clientId}:${clientSecret}`);
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${authorization}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: clientId
    }),
  })
  const data = await response.json();
  return data.access_token;
};
