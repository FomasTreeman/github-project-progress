<script>
  import { Page, Progressbar } from 'konsta/svelte';
  export let data;

  $: console.log(data);

  let progress = 0.1;
</script>

<Page>
  <Progressbar {progress} />
</Page>
