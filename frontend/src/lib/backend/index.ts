import * as env from './env'

export { env }

export function getBackendUrl(path?: string): string {
  const base = env.appenv('DISHER_BACKEND_URL')

  if (!base) {
    throw new Error('DISHER_BACKEND_URL not set')
  }

  if (!path) {
    path = '/'
  }

  if (!path.startsWith('/')) {
    path = `/${path}`
  }

  return `${base}${path}`
}
