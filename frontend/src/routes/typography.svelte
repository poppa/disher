<script lang="ts">
  import { env } from '$lib/env'
</script>

<svelte:head>
  <title>{env('SITE_NAME', 'Disher')}</title>
</svelte:head>

<div class="container">
  <h1>Hello world!</h1>
  <h2>Hello world!</h2>
  <h3>Hello world!</h3>
  <h4>Hello world!</h4>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed est ac
    velit imperdiet elementum ac quis magna. Aenean justo mauris, finibus nec
    blandit id, eleifend et risus.
  </p>

  <ul>
    <li>Maecenas molestie at libero nec vehicula. Quisque ac sodales erat.</li>
    <li>Nunc et pretium quam.</li>
    <li>
      Quisque semper tincidunt justo, placerat imperdiet massa malesuada a.
    </li>
  </ul>

  <p>
    Sed pellentesque, tellus ut venenatis dictum, justo leo tincidunt est, quis
    ultricies ex augue at nisi. Suspendisse a venenatis turpis, a congue ante.
    Morbi ac fermentum odio. Integer massa diam, imperdiet sed elementum vel,
    luctus eget diam. Pellentesque sed rutrum dolor. Suspendisse urna nunc,
    commodo ac pellentesque eget, fermentum eu nunc.
  </p>

  <p>
    Aliquam consectetur sodales mauris. Cras felis urna, finibus sed arcu at,
    congue gravida velit. Praesent sagittis nunc eget posuere consequat.
  </p>
</div>

<style>
</style>
