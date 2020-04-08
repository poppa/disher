import { Glob, IOptions } from 'glob'

/**
 * Glob search for files. This is an async wrapper for
 * {@link https://www.npmjs.com/package/glob | glob}
 *
 * @param globPath - Glob pattern to match
 * @param options - Glob options
 */
export async function glob(
  globPath: string,
  options?: IOptions
): Promise<string[]> {
  return new Promise((resolve, reject) => {
    try {
      new Glob(globPath, options || {}, (err, matches) => {
        if (err) {
          reject(err)
        } else {
          resolve(matches)
        }
      })
    } catch (e) {
      reject(e)
    }
  })
}
