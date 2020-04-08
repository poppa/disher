import { glob } from './glob'
import { Undefinable } from './types'
import { Loggable } from './log'

export interface RequireModule {
  [key: string]: NodeModule
}

export type FormatFunction = (s: string) => void

/**
 * This will `require()` all files matching the pattern in `path`
 * @param path - Path or paths to require
 */
export async function globRequire(
  path: string | string[],
  fmt?: FormatFunction,
  logger?: Loggable
): Promise<Undefinable<RequireModule[]>> {
  const log = logger || console

  try {
    if (!Array.isArray(path)) {
      path = [path]
    }

    const ret: RequireModule[] = []

    for (const p of path) {
      try {
        const files = await glob(p, { absolute: true })

        files.forEach((f) => {
          try {
            if (fmt) {
              fmt(f)
            }

            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const rr = require(f) as RequireModule
            ret.push(rr)
          } catch (err) {
            log.error({ err }, `Failed loading module ${f}`)
          }
        })
      } catch (e) {
        log.error(e, `Failed loading modules in ${p}`)
      }
    }

    return ret
  } catch (err) {
    log.error({ err }, 'globRequire')
    return undefined
  }
}
