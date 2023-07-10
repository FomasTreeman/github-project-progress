import githubFetch from '../../../utils/fetch';

const expectedLabels = ['E1', 'E2', 'E3', 'E5', 'E8', 'A1', 'A2', 'A3', 'A5', 'A8']
const relativeColours = []

const checkMissingLabels = (json: any) => {
  let foundLabels: string[] = []
  json.forEach((label: any) => expectedLabels.includes(label.name) && foundLabels.push(label.name))
  return expectedLabels.filter(label => !foundLabels.includes(label))
}

export async function load({ url, parent }: {url: any, parent: any}) {
  const { user, token } = await parent();
  const repo = url.searchParams.get('repo');

  const issues = await githubFetch(
    token.access_token,
    `repos/${user.login}/${repo}/issues`
  ).then((json) =>
    json.map((issue: any) => ({
      labels: issue.labels.map((label: any) => label.name),
      title: issue.title,
      milestone: issue.milestone,
    }))
  );

  const labels = await githubFetch(
    token.access_token,
    `repos/${user.login}/${repo}/labels`
  )
  return {
    issues,
  };
}
