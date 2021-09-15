<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'
  import { requireAuth, sequence } from '$lib/load'

  export const load: Load = sequence(
    requireAuth,
    async ({ session, fetch }) => {
      const query = await fetch(`/api/profile/${session.user.id}`)

      if (query.ok) {
        const profile = await query.json()

        return {
          props: {
            profile: profile.user,
          },
        }
      }

      return {
        status: 404,
      }
    }
  )
</script>

<script lang="ts">
  import { isModerator, pageTitle, resovleUserProfileImage } from '$lib/misc'
  import { session } from '$app/stores'
  import { goto } from '$app/navigation'

  export let profile: Record<string, string>

  let profileImageUrl = resovleUserProfileImage(profile)

  async function logout() {
    const r = await fetch(`/api/logout?_=${Date.now()}`)
    $session.user = undefined
    await goto('/')
  }
</script>

<svelte:head>
  <title>{pageTitle(profile.fullname)}</title>
</svelte:head>

<div class="user-profile">
  <header>
    <div class="avatar--wrapper" class:moderator={isModerator(profile)}>
      <div class="avatar">
        <img src={profileImageUrl} alt={profile.fullname} />
      </div>
    </div>
    <h1>{profile.fullname}</h1>
    <p class="username">{profile.username}</p>
  </header>
  <section class="my">
    <!-- FIXME: Markdown text -->
    <p>{profile.bio}</p>

    <p>
      <button on:click={logout}>Logout</button>
    </p>
  </section>
</div>

<style lang="scss">
  .user-profile {
    display: flex;
    flex-direction: column;
    align-items: center;

    header {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      /* background-color: var(--clr-tertiary); */
      background-image: var(--tertiary-gradient);
      /* border-top: 1px solid var(--clr-primary-400); */
      padding: var(--padding);
    }

    h1 {
      position: relative;
      color: var(--clr-secondary-700);
      margin-top: calc(var(--padding) / 2);
    }
  }

  .username {
    margin: 0;
    color: var(--clr-primary-700);
  }

  .avatar {
    position: relative;
    width: 160px;
    height: 160px;
    border-radius: 120px;
    overflow: hidden;
    border: 20px solid var(--clr-secondary-700);
    /* box-shadow: 0 0 0 20px var(--clr-primary); */

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      object-position: center center;
    }

    &--wrapper {
      position: relative;
    }
  }

  .moderator::before {
    z-index: 2;
    content: 'Mod';
    font-weight: bold;
    font-size: var(--fs-100);
    text-transform: uppercase;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(85%, -50%);
    padding: 0.3em 0.5em;
    border-radius: var(--border-radius);
    background: var(--clr-secondary-700);
    color: var(--clr-tertiary);
  }
</style>
