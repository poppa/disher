const sveltePreprocess = require('svelte-preprocess')
const node = require('@sveltejs/adapter-node')
const pkg = require('./package.json')
const dotenv = require('dotenv')
const { resolve } = require('path')

dotenv.config()
dotenv.config({ path: '.env.local' })
process.env.DISHER_VERSION = pkg.version

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: sveltePreprocess({
    replace: [['process.env.DISHER_VERSION', JSON.stringify(pkg.version)]],
  }),

  kit: {
    // By default, `npm run build` will create a standard Node app.
    // You can create optimized builds for different platforms by
    // specifying a different adapter
    adapter: node(),

    // hydrate the <div id="svelte"> element in src/app.html
    target: '#disher',

    vite: {
      resolve: {
        alias: {
          $comp: resolve(__dirname, './src/components'),
          $types: resolve(__dirname, './src/types'),
          $stores: resolve(__dirname, './src/stores'),
        },
      },
    },
  },
}
