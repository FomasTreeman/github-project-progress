import fetch from 'node-fetch';

interface IToken {
  access_token: string,
  token_type: "bearer",
  scope?: string
}

const tokenURL = 'https://github.com/login/oauth/access_token';
const userURL = 'https://api.github.com/user';

const clientId = import.meta.env.VITE_CLIENT_ID;
const secret = import.meta.env.VITE_CLIENT_SECRET;

export async function GET({ url, cookies }: {url: {searchParams: {get: (code: string) => string}} ,cookies: {get: (cookie: string) => string, set: (name:string, content: string) => {}}}) {
  const code = url.searchParams.get('code');

  // get accessToken
  const token = await getToken(code) as IToken;
  // get user
  const user = await getUser(token);

  const sessionCookie = JSON.stringify({ user, token });

  cookies.set('session', sessionCookie);

  return new Response(null, {
    status: 302,
    headers: {
      location: '/',
    },
  });
}

async function getUser({access_token}: IToken) {
  return await fetch(userURL, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  }).then((r) => r.json());
}

async function getToken(code: string) {
  return await fetch(tokenURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: secret,
      code,
      
    }),
  }).then((r) => r.json());
}
