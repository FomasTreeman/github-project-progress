export async function load({ parent }) {
  const { user, token } = await parent();

  console.log(user, token);

  const repos = await fetch(
    `https://api.github.com/users/${user.login}}/repos`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: token,
      },
    }
  ).then((resp) => resp.json());
  // .then((json) => {
  //     // console.log(json);
  //     return [
  //   ...json.map((repo) => ({
  //     repo.name,
  //   })),
  // ]});

  return {
    repos,
  };
}
