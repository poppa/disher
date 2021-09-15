<script lang="ts">
  import logo from '../../svg/logo'

  export let payoff = ''
</script>

<span class="brand">
  {@html logo}
  <span class="brand__name"
    >Disher
    {#if payoff}
      <span class="brand__payoff">{payoff}</span>
    {/if}
  </span>
</span>

<style lang="scss">
  .brand {
    display: flex;
    align-items: center;
    font-weight: 500;

    &__name {
      margin-left: var(--inline-spacing);
      line-height: 1;
      letter-spacing: 0.05em;
    }

    &__payoff {
      display: block;
      font-size: small;
      font-weight: normal;
    }
  }
</style>
