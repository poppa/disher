<script lang="ts">
  import type { Maybe } from 'src/types'

  import Input from '../../components/form/Input.svelte'

  let email: Maybe<string>
  let password: Maybe<string>

  function handleEmail(e: CustomEvent) {
    console.log(`email:`, e.detail)
  }

  function handlePassword(e: CustomEvent) {
    console.log(`password:`, e.detail)
  }
</script>

<div class="container my">
  <h1>Join</h1>

  <form class="my">
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

    <div class="my">
      <button class="button">Register</button>
    </div>
  </form>
</div>
