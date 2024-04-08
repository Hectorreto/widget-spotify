const { clientId: client_id, clientSecret: client_secret } = require("../env");
const express = require('express')
const querystring = require('querystring');

var redirect_uri = 'https://1aee-2806-2f0-5161-ff4d-ac55-bac7-752-c170.ngrok-free.app/callback';
let lastState = '';

var app = express();

const generateRandomString = (n) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  for (let i = 0; i < n; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[randomIndex];
  }

  lastState = randomString;
  return randomString;
}

app.get('/', (req, res) => {
  res.send(`
    <style>
      a {
        margin: 10px;
        padding: 10px;
        border: 2px solid black;
      }
      .main {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        inset: 0;
      }
    </style>
    Hello world!

    <div class="main">
      <a href="/login">login</a>
    </div>

  `);
})

app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  var scope = 'user-read-currently-playing';

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/callback', function(req, res) {
  const code = req.query.code || null;
  const state = req.query.state || null;

  if (state === null || state !== lastState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    var authOptions = {
      method: 'POST',
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    const requestBody = new URLSearchParams();
    requestBody.append('grant_type', 'authorization_code');
    requestBody.append('code', code);
    requestBody.append('redirect_uri', redirect_uri);

    fetch(authOptions.url, {
      method: 'POST',
      headers: {
        'Authorization': authOptions.headers.Authorization,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: requestBody.toString(),
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(console.error)
  }
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// data = {
//   access_token: 'BQDcMzUy3d725iqsXTtPQ60c7sLE8cOzp6dw-GiLhG-saA-z5NitG_tSxGccszrGUJJ9I33eDOVj0hyy59VyoMEm0_Ic_sIbc7dygQ9ZLt0yI6nGbj-Vk7UwNVv4c4mVH_UVDimgLfT1acOcQskGo6vWp7ANhL-3T-WEc0QDxx5Av3bZ6LNCBxzSPq9xmD_aKwQ8f3M03rQ',
//   token_type: 'Bearer',
//   expires_in: 3600,
//   refresh_token: 'AQB-y7JLBnMLoo9yAMTLXrwhXeScv-fpCWjkvJlOQq-3at1653i1pUGjQq7IblFNgE7CYM7AiGapIQUiYkKgNN6XiAoWcPtAcP7q2PtctN7D53pgkPDV59Z7mqqyUtZ_9bQ',
//   scope: 'user-read-currently-playing'
// }
