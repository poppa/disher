import { resolve } from 'path'

/**
 * Turns realtive path `path` into an absolute path
 * @param relativePath
 */
export function makeAbsolutePath(relativePath: string): string {
  if (!relativePath.startsWith('/')) {
    return resolve(relativePath)
  }

  return relativePath
}
