<script lang="ts">
  import BrandLogo from './BrandLogo.svelte'
</script>

<footer>
  <div class="container py-x05">
    <div class="brand">
      <BrandLogo />
    </div>
  </div>
</footer>

<style lang="scss">
  footer {
    --clr-1: hsl(var(--clr-tertiary-hs) 15%);
    --clr-2: hsl(var(--clr-tertiary-hs) 35%);

    font-size: var(--fs-small);
    background-color: var(--clr-tertiary);
    background: linear-gradient(305deg, var(--clr-2) 0%, var(--clr-1) 100%);
    color: hsl(var(--clr-tertiary-hs) 70%);
  }

  :global(.logo) {
    width: 22px;
    height: 22px;
    fill: currentColor;
  }
</style>
