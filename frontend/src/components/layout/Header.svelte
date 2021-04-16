<script lang="ts">
  import Logo from './Logo.svelte'
</script>

<header>
  <div class="container py-x05">
    <h1>
      <a href="/">
        <Logo />
        <span>Disher</span>
      </a>
    </h1>
  </div>
</header>

<style lang="scss">
  header {
    background: linear-gradient(
      305deg,
      var(--clr-secondary) 0%,
      var(--clr-primary) 100%
    );
  }

  h1 {
    margin: 0;

    a {
      display: flex;
      color: white;
      text-decoration: none;

      :global(.logo) {
        width: 48px;
        height: 48px;
        fill: white;
      }

      span {
        display: block;
        margin-left: var(--inline-spacing);
      }
    }
  }
</style>
