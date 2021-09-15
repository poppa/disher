<script lang="ts" context="module">
  export interface InputComponentEvent {
    value: string | number
    originalTarget: HTMLInputElement
  }
</script>

<script lang="ts">
  import type { Maybe } from 'src/types'
  import { createEventDispatcher } from 'svelte'

  // Props
  export let id: string
  export let label: string
  export let name: string
  export let value: string | number = ''
  export let placeholder: Maybe<string> = undefined
  export let ariaLabel: string = ''
  export let required = false
  export let disabled = false
  export let type:
    | 'text'
    | 'password'
    | 'email'
    | 'url'
    | 'date'
    | 'textarea'
    | 'number' = 'text'

  // Internals
  let focused = value.toString().length > 0
  const dispatch = createEventDispatcher()

  function setFocus() {
    focused = true
  }

  function unFocus() {
    focused = value.toString().length > 0
  }

  // We can't bind the value on the input with a dynamic type.
  // Hence this function
  function handleInput(e: Event) {
    const t = e.target as HTMLInputElement
    value = type.match(/^(number|range)$/) ? Number(t.value) : t.value
    dispatch('input', { originalTarget: t, value })
  }
</script>

<div class="form-group form-group--fancy" class:focused>
  <label for={id}>{label}</label>
  {#if type === 'textarea'}
    <!-- prettier-ignore -->
    <textarea
      {name}
      {id}
      {placeholder}
      {disabled}
      aria-label={ariaLabel || label}
      {required}
      bind:value
      on:focus={setFocus}
      on:blur={unFocus}
      ></textarea>
  {:else}
    <input
      {type}
      {name}
      {id}
      {placeholder}
      {required}
      {disabled}
      aria-label={ariaLabel || label}
      on:input={handleInput}
      on:focus={setFocus}
      on:blur={unFocus}
    />
  {/if}
</div>
