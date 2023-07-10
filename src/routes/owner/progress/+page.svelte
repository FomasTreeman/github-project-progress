<script lang="ts">
  import { Page, Progressbar } from 'konsta/svelte';
  import type { IIssue } from '../../../types/types';
  export let data;
  let expectedProgress = 0;
  let actualProgress = 0;

  /**
   * Get the total expected or actuals from a repo
   * @param {string} type - expected or actual (E or A)
   * @return {number}
   */
  const expectedActualTotal = (type: string) => {
    //why doesnt jsdoc work here?
    return data.issues.reduce(
      (acc: number, issue: any) =>
        acc +
          parseInt(
            issue.labels
              .find((label: string) => label.toUpperCase().includes(type))
              ?.slice(1)
          ) || 0,
      0
    );
  };

  $: {
    const totalExpected = expectedActualTotal('E');
    const totalActuals = expectedActualTotal('A');
    const totalClosed: number = data.issues.reduce(
      (acc: number, issue: IIssue): number =>
        issue.state === 'closed' ? acc + 1 : 0,
      0
    );

    console.log(totalClosed);
    const expectedTotal =
      totalExpected * (data.issues.length / totalClosed) || 0;
    const actualTotal = (totalActuals * data.issues.length) / totalClosed || 0;
    actualProgress = parseInt((actualTotal / 100).toFixed(2));
    expectedProgress = parseInt((expectedTotal / 100).toFixed(2));
  }
</script>

<Page>
  <h2 class="m-20 text-4xl">{(expectedProgress * 100).toFixed(2)} %</h2>
  <Progressbar progress={expectedProgress} class="bg-slate-200 m-20" />
  <Progressbar
    progress={actualProgress}
    class="bg-slate-200 text-sky-400 m-20"
  />
  <ul class="pl-5">
    {#each data.issues as issue}
      <h2>
        {issue.labels.join(' -> ')}
        {issue.labels.toString().includes('A') ? '✅' : '❌'} : {issue.title}
      </h2>
    {/each}
  </ul>
</Page>
