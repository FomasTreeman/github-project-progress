<script>
  import { Button } from 'konsta/svelte';

  export let data;
  $: console.log(data);
</script>

<main>
  <form method="GET" action="/progress">
    <label for="repo" class="text-xl m-5">Choose a repo:</label>
    <!-- {#if data?.repos}
      <select id="repo" name="repo">
        {#each data.repos as repo}
          <option value={repo.name}> {repo.name} </option>
        {/each}
      </select>
    {/if} -->
    <Button raised rounded large class="k-color-brand-green" tonal>
      Check progress
    </Button>
  </form>
</main>
