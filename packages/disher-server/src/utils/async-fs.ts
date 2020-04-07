import { promises as fs, PathLike } from 'fs'
import { W_OK, R_OK } from 'constants'

/**
 * Safely checks if `path` exists
 *
 * @param path The path to check the existence of
 * @param mode What access rights is required to decide whether the path
 *  exists or not. By default the path needs to be both readable and writable
 */
export async function exists(
  path: PathLike,
  mode = R_OK | W_OK
): Promise<boolean> {
  try {
    await fs.access(path, mode)
    return true
  } catch (e) {
    return false
  }
}
