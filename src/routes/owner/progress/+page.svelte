<script>
  import { Page, Progressbar } from 'konsta/svelte';
  export let data;
  let progress = 0;

  $: {
    const totalExpected = data.issues.reduce(
      (acc, issue) =>
        acc +
          parseInt(
            issue.labels
              .find((label) => label.toUpperCase().includes('E'))
              .slice(1)
          ) || 0,
      0
    );
    console.log(totalExpected);
    console.log(data.issues.length);
    const total = totalExpected / data.issues.length;
    // progress = total / totalCompleted;
    progress = Math.floor(total * 100) / 100;
  }
</script>

<Page>
  <h2 class="m-20 text-4xl">{progress} %</h2>
  <Progressbar {progress} class="bg-slate-200 m-20" />
  <ul class="pl-5">
    {#each data.issues as issue}
      <h2>{issue.labels[0]} ❌ : {issue.title}</h2>
    {/each}
  </ul>
</Page>
