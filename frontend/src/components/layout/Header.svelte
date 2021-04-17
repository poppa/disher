<script lang="ts">
  import BrandLogo from './BrandLogo.svelte'
</script>

<header>
  <div class="container py-x05">
    <h1>
      <a href="/">
        <BrandLogo payoff="You are served" />
      </a>
    </h1>
    <div class="actions">
      <ul class="h-list h-list--right">
        <li><a href="/join">Join</a></li>
        <li><a href="/login">Login</a></li>
      </ul>
    </div>
  </div>
</header>

<style lang="scss">
  header {
    background: linear-gradient(
      305deg,
      var(--clr-secondary) 0%,
      var(--clr-primary) 100%
    );
    color: white;

    > .container {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  a {
    color: white;
    text-decoration: none;
  }

  h1 {
    margin: 0;

    a {
      display: flex;
      color: inherit;
      text-decoration: none;

      :global(.logo) {
        width: 48px;
        height: 48px;
        fill: currentColor;
      }
    }

    :global(.brand) {
      font-weight: bold;
    }

    :global(.brand__payoff) {
      font-size: var(--fs-200);
      // color: hsl(var(--clr-secondary-hs) 85%);
      opacity: 0.6;
    }
  }
</style>
