<script lang="ts">
  import { env } from '$lib/env'
</script>

<svelte:head>
  <title>{env('SITE_NAME', 'Disher')}</title>
</svelte:head>

<div class="container py">
  <h1>Welcome to Disher</h1>
  <p><a href="/typography">Typography</a> test page</p>
</div>

<style>
</style>
