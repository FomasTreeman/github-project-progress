
export function load({ cookies }: {cookies: {get: (cookie: string) => string}}) {
  const { user, token } = JSON.parse(cookies.get('session'));
  return { token, user };
}
