<script lang="ts">
  import { pageTitle } from '$lib/misc'
</script>

<svelte:head>
  <title>{pageTitle('Typography')}</title>
</svelte:head>

<div class="container py">
  <div class="flow">
    <h1>Lorem ipsum dolor sit amet</h1>

    <p>
      Consectetur adipiscing elit, <em>sed do eiusmod tempor</em> incididunt ut
      labore et <a href="#quote-1">dolore magna</a> aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>

    <h2>Ut enim ad minim veniam</h2>
    <p>
      Eget aliquet nibh praesent tristique. Facilisis leo vel fringilla est
      ullamcorper eget nulla facilisi etiam. Magna sit amet purus gravida quis.
      Urna id volutpat lacus laoreet non. Iaculis nunc sed augue lacus viverra
      vitae congue eu. Venenatis urna cursus eget nunc. Tempus quam pellentesque
      nec nam.
    </p>

    <blockquote id="quote-1">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <footer>Some Dude</footer>
    </blockquote>

    <p>
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
      deserunt mollit anim id est laborum. Varius quam quisque id diam vel quam.
      Ipsum suspendisse ultrices gravida dictum fusce ut placerat orci. Arcu non
      odio euismod lacinia. Bibendum est ultricies integer quis auctor elit sed
      vulputate mi. Nullam non nisi est sit amet. Morbi leo urna molestie at
      elementum eu. Sodales ut etiam sit amet nisl purus in mollis.
    </p>
  </div>

  <hr />

  <h1>Hello h1 world!</h1>
  <h2>Hello h2 world!</h2>
  <h3>Hello h3 world!</h3>
  <h4>Hello h4 world!</h4>
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

  <hr />

  <h1>Hello h1 world!<br />with linebreak</h1>
  <h2>Hello h2 world!<br />with linebreak</h2>
  <h3>Hello h3 world!<br />with linebreak</h3>
  <h4>Hello h4 world!<br />with linebreak</h4>
</div>

<style>
</style>
