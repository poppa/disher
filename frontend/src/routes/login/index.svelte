<script lang="ts">
  import type { Maybe } from 'src/types'
  import Input from '$comp/form/Input.svelte'
  import type { InputComponentEvent } from '$comp/form/Input.svelte'
  import { pageTitle } from '$lib/page-title'

  let email: Maybe<string>
  let password: Maybe<string>
  let emailOk = false
  let passwordOk = false

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
      const res = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({
          identifier: email,
          password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (res.ok) {
        console.log(`AuthRes:`, await res.json())
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
