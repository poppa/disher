<script context="module" lang="ts">
  import type { Maybe } from '$types/index'
  import type { Load } from '@sveltejs/kit'

  export const load: Load = ({ page, context }) => {
    let redir: Maybe<string>

    if (page.query.has('__from')) {
      redir = page.query.get('__from') as string
    }

    return {
      props: {
        redirectTo: redir,
      },
    }
  }
</script>

<script lang="ts">
  import type { UserCookie } from '$types/backend'
  import type { InputComponentEvent } from '$comp/form/Input.svelte'
  import Input from '$comp/form/Input.svelte'
  import { pageTitle } from '$lib/misc'
  import { userStore } from '$stores/user'
  import { goto } from '$app/navigation'
  import { session } from '$app/stores'

  export let redirectTo = '/'
  let email: Maybe<string>
  let password: Maybe<string>
  let emailOk = false
  let passwordOk = false

  console.log(`Session:`, $session)

  function handleEmail(e: CustomEvent<InputComponentEvent>) {
    const inp = e.detail.originalTarget
    email = inp.value
    emailOk = inp.checkValidity()
  }

  function handlePassword(e: CustomEvent<InputComponentEvent>) {
    const inp = e.detail.originalTarget
    password = inp.value
    passwordOk = inp.checkValidity()
  }

  async function handleSubmit(e: Event) {
    e.preventDefault()

    try {
      const query = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({
          identifier: email,
          password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (query.ok) {
        const res = (await query.json()) as UserCookie
        session.set({ user: res.user })
        userStore.set(res.user)
        await goto(redirectTo)
      }
    } catch (err: unknown) {
      console.error('Error:', err)
    }
  }
</script>

<svelte:head>
  <title>{pageTitle('Login')}</title>
</svelte:head>

<div class="container my">
  <div class="box">
    <h1>Login</h1>
    <form class="mt-x05" on:submit={handleSubmit}>
      <Input
        type="email"
        name="email"
        label="Email"
        id="email"
        required={true}
        on:input={handleEmail}
      />
      <Input
        type="password"
        name="password"
        label="Password"
        id="password"
        required={true}
        on:input={handlePassword}
      />

      <div class="mt">
        <button class="button" disabled={!emailOk || !passwordOk}>Login</button>
      </div>
    </form>
  </div>
</div>
