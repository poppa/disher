import type { Maybe } from 'src/types'

export function env(name: string): Maybe<string>
export function env(name: string, defaultValue: string): string

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function env(name: string, defaultValue?: string) {
  if (!name.startsWith('VITE_')) {
    name = `VITE_${name}`
  }

  const v = import.meta.env[name]

  if (typeof v === 'undefined' && typeof defaultValue !== 'undefined') {
    return defaultValue
  }

  return v ? v.toString() : undefined
}
