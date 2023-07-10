<script>
  import { Page, Button, Block, Navbar, Preloader } from 'konsta/svelte';

  export let data;
  let org = '';
  let repo = '';
  let loadingOrg = false;
  let orgRepos = [{ name: '', url: '' }];

  async function getOrgRepos() {
    loadingOrg = true;
    let response = await fetch(`/api/org?org=${org}`);
    const json = await response.json();
    orgRepos = [...json.repos];
    loadingOrg = false;
  }

  $: console.log(repo);
</script>

<Page>
  <Navbar
    title="PICK YOUR REPO TO VIEW YOUR PROGRESS"
    className="top-0 sticky"
  />
  <div class="flex flex-col">
    <Block strong inset class="flex items-center gap-4">
      <label for="org" class="text-xl">Add an org:</label>
      <input
        id="org"
        name="org"
        type="search"
        class="bg-slate-800 text-slate-100 rounded-md p-2"
        bind:value={org}
      />
      {#if loadingOrg}
        <Preloader />
      {:else}
        <button on:click={getOrgRepos}>
          <Button>Add org</Button>
        </button>
      {/if}
    </Block>
    <Block strong inset>
      <form
        method="get"
        action="/owner/progress"
        class="flex items-center gap-4"
      >
        <label for="repo" class="text-xl">Choose a repo:</label>
        <select
          id="repo"
          name="repo"
          bind:value={repo}
          class="bg-slate-800 text-slate-100 rounded-md p-2"
          required
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
        <Button raised rounded large class="k-color-brand-green w-40" tonal>
          Check progress
        </Button>
      </form>
    </Block>
  </div>
</Page>
