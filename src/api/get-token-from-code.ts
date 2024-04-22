const API_URL = 'http://localhost:3000/token';

export const getTokenFromCode = async (code: string) => {
  const response = await fetch(`${API_URL}?code=${code}`);
  const data = await response.json();
  return data.access_token;
};
