export function load({ cookies }) {
  console.log(cookies);
  const { user, token } = JSON.parse(cookies.get('session'));
  return { token, user };
}
