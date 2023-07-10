import githubFetch from '../../../../../utils/fetch';
import type { IIssue } from '../../../../../types/types';

const expectedLabels = ['E1', 'E2', 'E3', 'E5', 'E8', 'A1', 'A2', 'A3', 'A5', 'A8']
const relativeColours = []

const checkMissingLabels = (json: any) => {
  let foundLabels: string[] = []
  json.forEach((label: any) => expectedLabels.includes(label.name) && foundLabels.push(label.name))
  return expectedLabels.filter(label => !foundLabels.includes(label))
}

export async function load({ url, parent, fetch }: {url: any, parent: any, fetch: any}) {
  const { user, token } = await parent();
  const paths = url.pathname.slice(1).split('/')

  const response: IIssue[] = await githubFetch(fetch,
    token.access_token,
    `/repos/${paths[1] == 'personal' ? user.login : paths[1]}/${paths[2]}/issues?state=all&per_page=100`
  )

  const issues = response.map((issue: any) => ({
    labels: issue.labels.map((label: any) => label.name),
    title: issue.title,
    milestone: issue.milestone,
    state: issue.state
  }))

  // ** create labels that dont already exist

  // const labels = await githubFetch(
  //   token.access_token,
  //   `repos/${user.login}/${repo}/labels`
  // )
  return {
    issues,
  };
}
