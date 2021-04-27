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
  import { resovleUserProfileImage } from '$lib/misc'

  export let profile: Record<string, string>

  let profileImageUrl = resovleUserProfileImage(profile)
</script>

<div class="user-profile">
  <header>
    <div class="avatar">
      <img src={profileImageUrl} alt={profile.fullname} />
    </div>
    <h1>{profile.fullname}</h1>
  </header>
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
      color: var(--clr-secondary-700);
      margin-top: calc(var(--padding) / 2);
    }
  }

  .avatar {
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
  }
</style>
