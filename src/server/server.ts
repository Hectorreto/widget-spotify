import express from 'express';
import querystring from 'querystring';
import { getRefreshTokenFromCode } from '../api/get-refresh-token-from-code';
import { getTokenFromRefreshToken } from '../api/get-token-from-refresh-token';

const CLIENT_ID = process.env.CLIENT_ID || '';
const REDIRECT_URL = process.env.REDIRECT_URL || '';

const app = express();

const generateRandomString = (n: number) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  for (let i = 0; i < n; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[randomIndex];
  }

  return randomString;
};

app.get('/', (_req, res) => {
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
});

type User = {
  state: string;
  refreshToken: string;
};

const database = {
  users: {} as { [key: string]: User },
};

app.get('/login', (_req, res) => {
  const state = generateRandomString(16);
  const scope = 'user-read-currently-playing';

  database.users[state] = {
    state: state,
    refreshToken: '',
  };

  res.redirect('https://accounts.spotify.com/authorize?' + querystring.stringify({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: scope,
    redirect_uri: REDIRECT_URL,
    state: state,
  }));
});

app.get('/callback', (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;

  if (typeof state !== 'string' || !database.users[state]) {
    res.redirect('/#' + querystring.stringify({
      error: 'state_mismatch',
    }));
    return;
  }

  getRefreshTokenFromCode(code as string)
    .then(({ refresh_token }) => {
      const user = database.users[code as string];
      user.refreshToken = refresh_token;
    })
    .catch(console.error);

  res.send('Success! You can close this tab.');
});

app.get('/token', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const code = req.query.code || null;
  if (typeof code !== 'string') {
    res.status(400).json({
      error: 'code_mismatch',
    });
    return;
  }

  Promise.resolve()
    .then(async () => {
      if (database.users[code]?.refreshToken) {
        return database.users[code].refreshToken;
      } else {
        const data = await getRefreshTokenFromCode(code);
        database.users[code].refreshToken = data.refresh_token;
        return data.refresh_token;
      }
    })
    .then(async (refreshToken) => {
      const accessToken = await getTokenFromRefreshToken(refreshToken);
      res.json({
        access_token: accessToken,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
