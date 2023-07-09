export async function load({ parent }) {
  const { token, user } = await parent();

  const repos = await fetch(
    `https://api.github.com/users/${user.login}}/repos`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  ).then((r) => r.json());

  console.log(repos);

  return {
    repos,
  };
}
