<script lang="ts">
  import type { Maybe } from 'src/types'
  import Input from '../../components/form/Input.svelte'
  import type { InputComponentEvent } from '../../components/form/Input.svelte'

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
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<div class="container my">
  <div class="box">
    <h1>Login</h1>
    <form class="mt-x05">
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
