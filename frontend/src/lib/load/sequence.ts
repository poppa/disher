import { isPromise } from '$lib/promise'
import type { Load, LoadInput, LoadOutput } from '@sveltejs/kit/types/page'

/**
 * This class acts like a middleware runner for Load functions.
 */
class LoadSequence {
  private queue: Load[] = []

  constructor(...fns: Load[]) {
    this.queue = fns
  }

  public load = async (input: LoadInput): Promise<LoadOutput> => {
    const mw = [...this.queue]

    for (const fn of mw) {
      let res = fn(input)
      if (isPromise(res)) {
        res = await res
      }

      if (res.status !== 100) {
        return res
      }
    }

    console.warn(`Unhandled request in load chain from ${input.page.path}`)

    return { status: 404 }
  }
}

/**
 * Run multiple Load functions in sequence.
 *
 * If a function returns `{status: 100}` (e.g. HTTP Continue), the next Load
 * function in the sequence will run.
 *
 * If a function returns anything where `{status: 100}` doesn't exist that
 * result will in turn be returned to SvelteKit.
 *
 * @example
 * ```ts
 * // Load function in some route component
 *
 * export function load: Load = sequence(
 *   ({ session }) => {
 *     if (!session.user) {
 *       return {
 *         status: 401,
 *         error: new Error('Authentication required'),
 *       }
 *     }
 *
 *     return { status: 100 }
 *   },
 *   ({ session }) => {
 *     console.log('Yay, we are authed')
 *     return {
 *       props: { user: session.user }
 *     }
 *   }
 * )
 * ```
 *
 * @param fns Load functions to run in sequence
 * @returns Load function to pass to SvelteKit
 */
export function sequence(...fns: Load[]): Load {
  return new LoadSequence(...fns).load
}
