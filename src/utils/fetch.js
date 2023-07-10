import fetch from 'node-fetch';

/**
 *
 * @param {string} accessToken
 * @param {string} path
 * @returns {Promise<any>}
 */
const githubFetch = async (accessToken, path) => {
  return await fetch(`https://api.github.com/${path}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((resp) => resp.json());
};

export default githubFetch;
