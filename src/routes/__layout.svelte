<script lang="ts">
  import Footer from '../components/layout/Footer.svelte'
  import Header from '../components/layout/Header.svelte'
  import '../app.scss'
</script>

<Header />
<main>
  <slot />
</main>
<Footer />
