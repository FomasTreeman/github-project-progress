<script>
  // @ts-nocheck

  import { onMount } from 'svelte';

  export let data;
  $: console.log(data);
  let repos;

  // $: {
  //   if (data.user) {
  //     fetch(`https://api.github.com/users/${data.user.login}}/repos`, {
  //       headers: {
  //         Accept: 'application/vnd.github+json',
  //         Authorization: data.token,
  //       },
  //     })
  //       .then((resp) => resp.json())
  //       .then(
  //         (json) =>
  //           (repos = [
  //             ...json.map((repo) => ({
  //               name: repo.name,
  //             })),
  //           ])
  //       );
  //   }
  // }
</script>

<main>
  <h1>Welcome {data.user?.login}</h1>
  <a href="/login">
    <button>Login using Github</button>
  </a>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }
</style>
