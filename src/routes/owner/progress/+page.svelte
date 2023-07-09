<script>
  import { Page, Progressbar } from 'konsta/svelte';
  export let data;
  let progress = 0;

  /**
   * Get the total expected or actuals from a repo
   * @param {string} type - expected or actual (E or A)
   * @return {number}
   */
  const expectedActualTotal = (type) => {
    return data.issues.reduce(
      (acc, issue) =>
        acc +
          parseInt(
            issue.labels
              .find((label) => label.toUpperCase().includes(type))
              ?.slice(1)
          ) || 0,
      0
    );
  };

  $: {
    const totalExpected = expectedActualTotal('E');
    const totalActuals = expectedActualTotal('A');
    console.log(totalExpected);
    console.log(totalActuals);
    console.log(data.issues.length);
    const total = (totalExpected / data.issues.length) * totalActuals;
    // progress = total / totalCompleted;
    progress = (total / 100).toFixed(2);
  }
</script>

<Page>
  <h2 class="m-20 text-4xl">{(progress * 100).toFixed(2)} %</h2>
  <Progressbar {progress} class="bg-slate-200 m-20" />
  <ul class="pl-5">
    {#each data.issues as issue}
      <h2>{issue.labels[0]} ❌ : {issue.title}</h2>
    {/each}
  </ul>
</Page>
