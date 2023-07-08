export async function load({ url, parent }) {
  const { user, token } = await parent();
  const repo = url.searchParams.get('repo');

  console.log(user, repo);

  const issues = await fetch(
    `https://api.github.com/repos/${user.login}/${repo}/issues`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: token,
      },
    }
  ).then((resp) => resp.json());

  return {
    issues,
  };
}
