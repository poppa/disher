<script lang="ts">
  import { userStore } from '$stores/user'
  import BrandLogo from './BrandLogo.svelte'
  import StockUser from '../../svg/stock-user.svg'
</script>

<header>
  <div class="container">
    <h1>
      <a href="/">
        <BrandLogo payoff="You are served" />
      </a>
    </h1>
    <div class="actions">
      <ul class="h-list h-list--right">
        {#if $userStore}
          <li>
            <a href="/profile/me" class="user">
              {$userStore.username}
              <span
                class="avatar"
                style="background-image:url({$userStore.avatar || StockUser})"
              />
            </a>
          </li>
        {:else}
          <li><a href="/join">Join</a></li>
          <li><a href="/login">Login</a></li>
        {/if}
      </ul>
    </div>
  </div>
</header>

<style lang="scss">
  @use '../../scss/abstracts/breakpoints' as *;

  header {
    background: var(--primary-gradient);
    color: white;

    > .container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--container-padding);
    }
  }

  a {
    color: white;
    text-decoration: none;
  }

  h1 {
    margin: 0;
    font-size: 1.6rem;

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
      letter-spacing: 0.035rem;
    }
  }

  .actions {
    font-size: var(--fs-400);
  }

  .user {
    display: flex;
    align-items: center;

    .avatar {
      width: 24px;
      height: 24px;
      display: block;
      background-repeat: no-repeat;
      background-position: center left;
      background-size: cover;
      margin-left: var(--inline-spacing);
      border-radius: 50%;

      @include medium {
        width: 36px;
        height: 36px;
      }
    }
  }
</style>
