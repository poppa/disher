<script lang="ts">
  import '../app.scss'
  import Footer from '$comp/layout/Footer.svelte'
  import Header from '$comp/layout/Header.svelte'
</script>

<Header />
<main>
  <slot />
</main>
<Footer />
