<script>
  import { Page, Button } from 'konsta/svelte';

  export let data;
  let org = '';
  let orgRepos = [{ name: '', url: '' }];

  async function getOrgRepos() {
    let response = await fetch(`/api/org?org=${org}`);
    const json = await response.json();
    orgRepos = [...json.repos];
  }
</script>

<Page>
  <input
    id="org"
    name="org"
    type="search"
    class="bg-slate-800 text-slate-100 rounded-md p-2 m-10"
    bind:value={org}
  />
  <div on:click={getOrgRepos}>
    <Button>Add org</Button>
  </div>
  <form method="GET" action="/owner/progress" class="m-5">
    <label for="repo" class="text-xl m-5">Choose a repo:</label>
    <select
      id="repo"
      name="repo"
      class="bg-slate-800 text-slate-100 rounded-md p-2"
    >
      {#each data.repos as repo}
        <option value={repo.name}> {repo.name} </option>
      {/each}
      {#if orgRepos.length}
        {#each orgRepos as repo}
          <option value={repo.name}> {repo.name} </option>
        {/each}
      {/if}
    </select>
    <Button raised rounded large class="k-color-brand-green m-10" tonal>
      Check progress
    </Button>
  </form>
</Page>
