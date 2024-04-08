const endpoint = 'https://accounts.spotify.com/api/token'
const clientId = '641c231df49046e58daaa799da950681';
const clientSecret = 'fc117c44dc984668bbdbdc2f412cefe3';

const getToken = async () => {
  const requestBody = new URLSearchParams();
  requestBody.append('grant_type', 'client_credentials');
  requestBody.append('client_id', clientId);
  requestBody.append('client_secret', clientSecret);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: requestBody.toString(),
    })
    const data = await response.json();
    return {
      access_token: String(data.access_token),
      token_type: String(data.token_type),
      expires_in: Number(data.expires_in),
    }
  } catch (error) {
    console.error(error)
  }
}

getToken().then(data => {
  console.log(data)
})
