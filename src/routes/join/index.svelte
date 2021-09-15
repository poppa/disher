<script lang="ts">
  import { pageTitle } from '../../lib/misc'
  import type { Maybe } from '../../types'
  import Input from '../../components/form/Input.svelte'

  let email: Maybe<string>
  let password: Maybe<string>
  let inputOk = false

  function handleEmail(e: CustomEvent) {
    console.log(`email:`, e.detail)
  }

  function handlePassword(e: CustomEvent) {
    console.log(`password:`, e.detail)
  }
</script>

<svelte:head>
  <title>{pageTitle('Join')}</title>
</svelte:head>

<div class="container my">
  <div class="box">
    <h1>Join</h1>
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
        <button class="button" disabled={!inputOk}>Register</button>
      </div>
    </form>
  </div>
</div>
