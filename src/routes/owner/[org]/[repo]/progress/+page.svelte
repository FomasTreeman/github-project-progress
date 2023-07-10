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
  import type { IIssue } from '../../../../../types/types';
  export let data;
  let expectedProgress = 0;
  let actualProgress = 0;

  $: {
    const estimated = data.issues.reduce((acc: number, issue: any) => {
      const expected = issue.labels.find((label: string) => label.match('^E'));
      return expected ? acc + parseInt(expected[1]) : acc;
    }, 0);

    const projected: number = data.issues.reduce(
      (acc: number, issue: IIssue): number => {
        const actual = issue.labels.find((label) => label.match('^A'));
        const expected = issue.labels.find((label) => label.match('^E'));
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
        const actual = issue.labels.find((label) => label.match('^A'));
        return actual ? acc + parseInt(actual[1]) : acc;
      },
      0
    );

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
        <BreadcrumbsItem
          >{window.location.pathname.slice(1).split('/')[1]}</BreadcrumbsItem
        >
      </a>
      <BreadcrumbsSeparator />
      <BreadcrumbsItem active
        >{window.location.pathname.slice(1).split('/')[2]}</BreadcrumbsItem
      >
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
        {issue.labels.filter((label) => label.match('.*A|E[0-9]')).join(' -> ')}
        {issue.labels.toString().match('.*A[0-9]') ? '✅' : '❌'} : {issue.title}
      </ListItem>
    {/each}
  </List>
</Page>
