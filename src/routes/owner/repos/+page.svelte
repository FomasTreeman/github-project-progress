<script>
  import { Page, Button } from 'konsta/svelte';

  export let data;
</script>

<Page>
  <form method="GET" action="/owner/progress" class="m-5">
    <label for="repo" class="text-xl m-5">Choose a repo:</label>
    <select
      id="repo"
      name="repo"
      class="bg-slate-800 text-slate-100 rounded-md p-2"
    >
      {#each data.repos as repo}
        <option value={repo}> {repo} </option>
      {/each}
    </select>
    <Button raised rounded large class="k-color-brand-green m-10" tonal>
      Check progress
    </Button>
  </form>
</Page>
