<script>
  export let data;
  $: console.log(data);
</script>

<main>
  <form method="GET" action="/progress">
    <label for="repo">Choose a repo:</label>
    <select id="repo" name="repo">
      {#each data.repos as repo}
        <option value={repo.name}> {repo.name} </option>
      {/each}
    </select>
    <button> Check progress </button>
  </form>
</main>
