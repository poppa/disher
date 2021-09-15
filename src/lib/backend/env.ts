import { browser } from '$app/env'

export function appenv(key: string): string {
  if (browser) {
    throw new Error(`appenv() can not be called from the browser`)
  }

  const v = process.env[key]

  if (!v) {
    throw new Error(`Unknown appenv key "${key}"`)
  }

  return v
}
