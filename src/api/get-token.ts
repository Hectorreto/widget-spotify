const endpoint = 'https://accounts.spotify.com/api/token';
const clientId = process.env.CLIENT_ID || '';
const clientSecret = process.env.CLIENT_SECRET || '';

export const getToken = async () => {
  const requestBody = new URLSearchParams();
  requestBody.append('grant_type', 'client_credentials');
  requestBody.append('client_id', clientId);
  requestBody.append('client_secret', clientSecret);

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: requestBody.toString(),
  });
  const data = await response.json();
  return {
    access_token: String(data.access_token),
    token_type: String(data.token_type),
    expires_in: Number(data.expires_in),
  };
};

getToken().then((data) => {
  console.log(data);
}).catch((error) => {
  console.error(error);
});
