import githubFetch from "../../utils/fetch";

export async function GET({cookies, searchParams}: {cookies: any, searchParams: any}) {
    const {token} = JSON.parse(cookies.get('session'))
    const org = searchParams.get('org')
    const orgRepos = githubFetch(token.access_token, `/orgs/${org}/repos`)

    return new Response(JSON.stringify(orgRepos), {
        status: 302,
        headers: {
          location: '/owner/repos',
        },
      });
}