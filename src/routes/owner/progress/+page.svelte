<script lang="ts">
  import {
    Page,
    Progressbar,
    Block,
    Breadcrumbs,
    BreadcrumbsItem,
    BreadcrumbsSeparator,
    List,
    ListItem,
  } from 'konsta/svelte';
  import type { IIssue } from '../../../types/types';
  export let data;
  let expectedProgress = 0;
  let actualProgress = 0;

  $: {
    const estimated = data.issues.reduce(
      (acc: number, issue: any) =>
        acc +
          parseInt(
            issue.labels
              .find((label: string) => label.toUpperCase().includes('E'))
              ?.slice(1)
          ) || 0,
      0
    );
    const projected: number = data.issues.reduce(
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
    const originalEstimate = data.issues.reduce(
      (acc: number, issue: IIssue): number => {
        const actual = issue.labels.find((label) => label.includes('A'));
        const expected = issue.labels.find((label) => label.includes('E'));
        return issue.state === 'closed'
          ? actual
            ? acc + parseInt(actual[1])
            : acc
          : acc;
      },
      0
    );

    console.log(estimated, originalEstimate, projected);
    const expectedTotal = (100 / estimated) * originalEstimate || 0;
    const actualTotal = (100 / projected) * originalEstimate || 0;
    actualProgress = parseInt(actualTotal.toFixed(4)) / 100;
    expectedProgress = parseInt(expectedTotal.toFixed(4)) / 100;
  }
</script>

<Page>
  <Block strongIos outlineIos>
    <Breadcrumbs>
      <a href="/owner/repos">
        <BreadcrumbsItem>fac27</BreadcrumbsItem>
      </a>
      <BreadcrumbsSeparator />
      <BreadcrumbsItem active>this repo</BreadcrumbsItem>
    </Breadcrumbs>
  </Block>
  <h2 class="m-20 text-4xl">
    Expected Progress: {(expectedProgress * 100).toFixed(2)} %
  </h2>
  <Progressbar progress={expectedProgress} class="bg-slate-200 m-15" />
  <h2 class="m-20 text-4xl">
    Actual Progress: {(actualProgress * 100).toFixed(2)} %
  </h2>
  <Progressbar
    progress={actualProgress}
    class="bg-slate-200 text-sky-400 m-15"
  />
  <List strong outline class="pl-5 m-20 pb-3">
    {#each data.issues as issue}
      <ListItem>
        {issue.labels.join(' -> ')}
        {issue.labels.toString().includes('A') ? '✅' : '❌'} : {issue.title}
      </ListItem>
    {/each}
  </List>
</Page>
