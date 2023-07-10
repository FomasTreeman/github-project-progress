import githubFetch from "../../../utils/fetch";
import { json } from '@sveltejs/kit';

export async function GET({cookies, url, fetch}: {cookies: any, url: any, fetch: any}) {
  const {token} = JSON.parse(cookies.get('session'))
  const org = url.searchParams.get('org')
  const orgRepos = await githubFetch(fetch, token.access_token, `/orgs/${org}/repos?per_page=50&sort=created`)
  const filteredOrgRepos = orgRepos.map((repo) => ({
    name: repo.name,
    url: repo.url,
  }));
  return json({repos: filteredOrgRepos});
}