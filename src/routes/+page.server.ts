import { redirect } from '@sveltejs/kit';
// import fetch from 'node-fetch';

export async function load({ cookies }: {cookies: any}) {
  const session = cookies.get('session');
  // fetch repos and issues and add them to the props
  if (!session) return;

  // const { token } = JSON.parse(session);
  // console.log('👩‍💻', token);
  // const clientId = import.meta.env.VITE_CLIENT_ID;
  // const secret = import.meta.env.VITE_CLIENT_SECRET;

  // const params = new URLSearchParams();
  // params.append('client_id', clientId);
  // params.append('client_secret', secret);
  // params.append('refresh_token', token.refresh_token);
  // params.append('grant_type', 'refresh_token');

  // const newToken = await fetch('https://github.com/login/oauth/access_token', {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //   },
  //   body: params,
  // })
  //   .then((response) => response.json())
  //   .catch((error) => {
  //     console.error('Error refreshing token:', error);
  //   });

  // console.log('🎶', newToken);
  // cookies.set('session', { ...session, token: newToken });

  throw redirect(308, '/owner/repos');
}
