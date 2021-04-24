<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'

  export const load: Load = async ({ session }) => {
    return {
      props: {
        user: session.user,
      },
    }
  }
</script>

<script lang="ts">
  import '../app.scss'
  import Footer from '$comp/layout/Footer.svelte'
  import Header from '$comp/layout/Header.svelte'
  import type { DisherUser, Maybe } from '$types/index'
  import { userStore } from '$stores/user'

  export let user: Maybe<DisherUser> = undefined
  userStore.set(user)
</script>

<Header />
<main>
  <slot />
</main>
<Footer />
