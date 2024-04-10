const endpoint = 'https://accounts.spotify.com/api/token';
const code = 'AQBYml8i5_znVR1E0FSCvsuGIF7Oc4pOCWA7JuBMFRY3TN6vN0E9FzC4q90VPZfeBmSJP2zSAtqCmbKCU1etRt8ZFAltddd7fwVueC4EhJyOHAZax-FmCedgVbG8gnis0GvtZxDLTNnwj32X--D-y7Wh5cn8aSF4DljwCM6YTamAoBMrhs54lh29PpA1fEcrb9nGPhvgZG-BAb9khdmSiCR5AeiboNqdNgcjqz0_DMGEa12NaOi_ACYDgmuE2aeqIYkGKnnwSmzkYk5QstMTdLl_';
const redirect_uri = 'https://96d2-2806-2f0-5161-ff4d-ac55-bac7-752-c170.ngrok-free.app/callback';

export const getToken = async () => {
  const requestBody = new URLSearchParams();
  requestBody.append('grant_type', 'authorization_code');
  requestBody.append('code', code);
  requestBody.append('redirect_uri', redirect_uri);

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': '',
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

// redirect-url/login
// 'https://96d2-2806-2f0-5161-ff4d-ac55-bac7-752-c170.ngrok-free.app/callback?code=AQBYml8i5_znVR1E0FSCvsuGIF7Oc4pOCWA7JuBMFRY3TN6vN0E9FzC4q90VPZfeBmSJP2zSAtqCmbKCU1etRt8ZFAltddd7fwVueC4EhJyOHAZax-FmCedgVbG8gnis0GvtZxDLTNnwj32X--D-y7Wh5cn8aSF4DljwCM6YTamAoBMrhs54lh29PpA1fEcrb9nGPhvgZG-BAb9khdmSiCR5AeiboNqdNgcjqz0_DMGEa12NaOi_ACYDgmuE2aeqIYkGKnnwSmzkYk5QstMTdLl_&state=zKPhD5PViuQMHlv6'
