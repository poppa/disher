import type { Maybe } from 'src/types'

export interface env {
  (name: string): Maybe<string>
}

console.log(typeof window !== 'undefined' ? import.meta.env : process.env)

export function env(name: string): Maybe<string> {
  if (typeof window !== 'undefined') {
    if (!name.startsWith('VITE_')) {
      name = `VITE_${name}`
    }

    return import.meta.env[name] as Maybe<string>
  } else {
    return process.env[name]
  }
}
