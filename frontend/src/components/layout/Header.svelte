<script lang="ts">
  import BrandLogo from './BrandLogo.svelte'
  import StockUser from '../../svg/stock-user.svg'
  import { session } from '$app/stores'

  let user: Record<string, string>
  $: user = $session.user
</script>

<header>
  <div class="container">
    <h1>
      <a href="/" class="brand--link">
        <BrandLogo payoff="You are served" />
      </a>
    </h1>
    <div class="actions">
      <ul class="h-list h-list--right">
        {#if user}
          <li>
            <a href="/profile/me" class="user">
              {user.username}
              <span
                class="avatar"
                style="background-image:url({user.avatar || StockUser})"
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
    font-size: 1.2rem;
    line-height: 1;

    a {
      display: flex;
      align-items: center;
      color: inherit;
      text-decoration: none;
    }

    :global(.brand) {
      font-weight: bold;
    }

    :global(.brand__payoff) {
      font-size: var(--fs-100);
      color: hsl(var(--clr-secondary-hs) 85%);
      opacity: 0.6;
      letter-spacing: 0rem;
    }
  }

  .brand--link {
    :global(.logo) {
      width: 36px;
      height: 36px;
      fill: currentColor;
    }
  }

  .actions {
    font-size: var(--fs-400);
  }

  .user {
    display: flex;
    align-items: center;
  }

  .avatar {
    width: 32px;
    height: 32px;
    display: block;
    background-repeat: no-repeat;
    background-position: center left;
    background-size: cover;
    margin-left: var(--inline-spacing);
    border-radius: 50%;
    border: 1px solid var(--clr-primary-400);
  }

  @include medium {
    h1 {
      font-size: 1.6rem;

      :global(.brand__name) {
        letter-spacing: 0px;
      }

      :global(.brand__payoff) {
        font-size: var(--fs-200);
      }
    }

    .brand--link {
      :global(.logo) {
        width: 48px;
        height: 48px;
      }
    }

    .avatar {
      width: 48px;
      height: 48px;
    }
  }
</style>
