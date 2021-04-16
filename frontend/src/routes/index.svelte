<script lang="ts">
  import { env } from '$lib/env'
</script>

<svelte:head>
  <title>{env('SITE_NAME', 'Disher')}</title>
</svelte:head>

<main>
  <div class="container">
    <h1>Hello world!</h1>
  </div>
</main>

<style>
</style>
