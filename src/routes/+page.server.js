export function load({ cookies }) {
  // const user = cookies.get('user');
  const session = JSON.parse(cookies.get('session'));
  console.log();
  if (!session) return { user: null, token: null };
  return {
    user: session.user,
    token: session.token,
  };
}
