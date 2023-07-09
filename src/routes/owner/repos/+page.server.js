export async function load({ parent }) {
  const { token, user } = await parent();

  const repos = await fetch(
    `https://api.github.com/users/${user.login}/repos`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token.access_token}`,
      },
    }
  )
    .then((r) => r.json())
    .then((json) => json.map((repo) => repo.name));

  console.log(repos);

  return {
    repos,
  };
}
