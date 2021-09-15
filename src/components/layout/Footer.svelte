<script lang="ts">
  import BrandLogo from './BrandLogo.svelte'
</script>

<footer>
  <div class="container">
    <div class="brand">
      <BrandLogo />
      <span class="version">v{process.env.DISHER_VERSION}</span>
    </div>
  </div>
</footer>

<style lang="scss">
  footer {
    --clr-1: hsl(var(--clr-tertiary-hs) 15%);
    --clr-2: hsl(var(--clr-tertiary-hs) 35%);

    font-size: var(--fs-smaller);
    background-color: var(--clr-tertiary);
    background: var(--tertiary-gradient);
    /* linear-gradient(305deg, var(--clr-2) 0%, var(--clr-1) 100%); */
    color: hsl(var(--clr-tertiary-hs) 70%);
  }

  .container {
    padding: var(--container-padding);
  }

  .brand {
    display: flex;
    align-items: center;
    line-height: 1;
  }

  .version {
    margin-left: var(--inline-spacing);
  }

  :global(.logo) {
    width: 22px;
    height: 22px;
    fill: currentColor;
  }
</style>
