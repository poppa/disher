<script lang="ts">
  import { pageTitle } from '$lib/misc'
</script>

<svelte:head>
  <title>{pageTitle()}</title>
</svelte:head>

<div class="container py">
  <h1>Welcome to Disher</h1>
  <p><a href="/typography">Typography</a> test page</p>
  <p>Go to your <a href="/profile/me">profile</a></p>
</div>

<style>
</style>
