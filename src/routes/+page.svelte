<script>
  import { Button } from 'konsta/svelte';
  import Icon from '@iconify/svelte';
  import { goto } from '$app/navigation';

  export let data;

  // if (data?.user) goto('/repos');
</script>

<main class="flex flex-col items-center justify-center h-screen gap-10">
  <h1 class="text-4xl">Welcome to progressCheck</h1>
  <span class="flex gap-5 items-center">
    <a href="/login">
      <Button raised rounded large class="k-color-brand-green" tonal
        >Login using Github</Button
      >
    </a>
    <Icon icon="bi:github" width="25" />
  </span>
</main>
