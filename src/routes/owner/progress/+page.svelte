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
    // const totalActuals = expectedActualTotal('A');
    const totalClosed: number = data.issues.reduce(
      (acc: number, issue: IIssue): number => {
        const actual = issue.labels.find((label) => label.includes('A'));
        const expected = issue.labels.find((label) => label.includes('E'));
        return issue.state === 'closed'
          ? actual
            ? acc + parseInt(actual[1])
            : expected
            ? acc + parseInt(expected[1])
            : acc
          : acc;
      },
      0
    );
    const totalClosedExpected = data.issues.reduce(
      (acc: number, issue: IIssue): number => {
        const actual = issue.labels.find((label) => label.includes('A'));
        const expected = issue.labels.find((label) => label.includes('E'));
        return issue.state === 'closed'
          ? expected
            ? acc + parseInt(expected[1])
            : acc
          : acc;
      },
      0
    );
    const totalExpectedActuals = data.issues.reduce(
      (acc: number, issue: IIssue): number => {
        const actual = issue.labels.find((label) => label.includes('A'));
        const expected = issue.labels.find((label) => label.includes('E'));
        return actual
          ? acc + parseInt(actual[1])
          : expected
          ? acc + parseInt(expected[1])
          : acc;
      },
      0
    );

    const expectedTotal = (100 / totalExpected) * totalClosedExpected || 0;
    const actualTotal = (100 / totalExpectedActuals) * totalClosed || 0;
    actualProgress = parseInt(actualTotal.toFixed(4)) / 100;
    expectedProgress = parseInt(expectedTotal.toFixed(4)) / 100;
  }
</script>

<Page>
  <h2 class="m-20 text-4xl">
    Expected Progress: {(expectedProgress * 100).toFixed(2)} %
  </h2>
  <Progressbar progress={expectedProgress} class="bg-slate-200 m-20" />
  <h2 class="m-20 text-4xl">
    Actual Progress: {(actualProgress * 100).toFixed(2)} %
  </h2>
  <Progressbar
    progress={actualProgress}
    class="bg-slate-200 text-sky-400 m-20"
  />
  <ul class="pl-5 m-8">
    {#each data.issues as issue}
      <h2>
        {issue.labels.join(' -> ')}
        {issue.labels.toString().includes('A') ? '✅' : '❌'} : {issue.title}
      </h2>
    {/each}
  </ul>
</Page>
