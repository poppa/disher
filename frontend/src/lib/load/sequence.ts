import type { Maybe } from '$types/types'
import type { Load, LoadInput, LoadOutput } from '@sveltejs/kit/types/page'

class LoadSequence {
  private middlewares: Load[] = []

  constructor(...fns: Load[]) {
    this.middlewares = fns
  }

  public load = async (input: LoadInput): Promise<LoadOutput> => {
    // Reverse so we can pop
    const mw = [...this.middlewares.reverse()]

    const iter = function* (): Generator<LoadOutput | Promise<LoadOutput>> {
      let fn: Maybe<Load>
      do {
        fn = mw.pop()
        if (fn) {
          yield fn(input)
        }
      } while (fn)
    }

    for await (const res of iter()) {
      if (res.status !== 100) {
        return res
      }
    }

    console.warn(`Unhandled request in load chain from ${input.page.path}`)

    return { status: 404 }
  }
}

export function sequence(...fns: Load[]): Load {
  return new LoadSequence(...fns).load
}
