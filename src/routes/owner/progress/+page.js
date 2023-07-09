export async function load({ url, parent }) {
  const { user, token } = await parent();
  const repo = url.searchParams.get('repo');

  const issues = await fetch(
    `https://api.github.com/repos/${user.login}/${repo}/issues`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token.access_token}`,
      },
    }
  )
    .then((resp) => resp.json())
    .then((json) =>
      json.map((issue) => ({
        labels: issue.labels.map((label) => label.name),
        title: issue.title,
        milestone: issue.milestone,
      }))
    );

  return {
    issues,
  };
}
