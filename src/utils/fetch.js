/**
 *
 * @param {any} fetch
 * @param {string} accessToken
 * @param {string} path
 * @returns {Promise<any>}
 */
const githubFetch = async (fetch, accessToken, path) => {
  console.log(`Fetching https://api.github.com${path}`);
  const response = await fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.json();
};

export default githubFetch;
