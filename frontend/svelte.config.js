import sveltePreprocess from 'svelte-preprocess'
import node from '@sveltejs/adapter-node'
import { version } from './package.json'
import { config } from 'dotenv'
import { resolve } from 'path'
import svg from '@poppanator/sveltekit-svg'

config()
config({ path: '.env.local' })
process.env.DISHER_VERSION = version

/** @type {import('@sveltejs/kit').Config} */
export const preprocess = sveltePreprocess({
  replace: [['process.env.DISHER_VERSION', JSON.stringify(version)]],
})
export const kit = {
  // By default, `npm run build` will create a standard Node app.
  // You can create optimized builds for different platforms by
  // specifying a different adapter
  adapter: node(),

  // hydrate the <div id="svelte"> element in src/app.html
  target: '#disher',

  vite: {
    plugins: [svg()],
    resolve: {
      alias: {
        $comp: resolve(__dirname, './src/components'),
        $types: resolve(__dirname, './src/types'),
        $stores: resolve(__dirname, './src/stores'),
      },
    },
  },
}
