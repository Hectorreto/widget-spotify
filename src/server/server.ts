import express from 'express';
import querystring from 'querystring';
import { getTokenFromCode } from '../api/get-token-from-code';

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
  refresh_token: string;
};

const database = {
  users: {} as { [key: string]: User },
};

app.get('/login', (_req, res) => {
  const state = generateRandomString(16);
  const scope = 'user-read-currently-playing';

  database.users[state] = {
    state: state,
    refresh_token: '',
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

  getTokenFromCode(code as string)
    .then(({ refresh_token }) => {
      const user = database.users[state as string];
      user.refresh_token = refresh_token;
    })
    .catch(console.error);

  res.send('Success! You can close this tab.');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
