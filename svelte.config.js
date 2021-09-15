import sveltePreprocess from 'svelte-preprocess'
import node from '@sveltejs/adapter-node'
import { config } from 'dotenv'
import svg from '@poppanator/sveltekit-svg'
import { readFileSync } from 'fs'

const data = readFileSync('./package.json')
const version = JSON.parse(data.toString()).version

config()
config({ path: '.env.local' })
process.env.DISHER_VERSION = version

/** @type {import('@sveltejs/kit').Config} */
const cfg = {
  preprocess: sveltePreprocess({
    replace: [['process.env.DISHER_VERSION', JSON.stringify(version)]],
  }),

  // By default, `npm run build` will create a standard Node app.
  // You can create optimized builds for different platforms by
  // specifying a different adapter
  adapter: node(),

  // hydrate the <div id="svelte"> element in src/app.html
  target: '#disher',

  vite: {
    plugins: [svg()],
  },
}

export default cfg
