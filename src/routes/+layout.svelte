<script>
  import '../app.css';
  import { App } from 'konsta/svelte';
</script>

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" />
<link
  href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@200&family=Josefin+Sans&display=swap"
  rel="stylesheet"
/>
<link
  href="https://fonts.googleapis.com/css2?family=Karla:wght@200&display=swap"
  rel="stylesheet"
/>

<App theme="ios" dark="true">
  <slot />
</App>
