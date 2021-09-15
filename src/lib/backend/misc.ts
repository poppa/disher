import { UserCookieName } from '$lib/constants'
import type { UserCookie } from '$types/backend'
import type { Maybe } from '$types/types'
import { parse } from 'cookie'
import { appenv } from './env'

export function getBackendUrl(path?: string): string {
  const base = appenv('DISHER_BACKEND_URL')

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

export function getUserCookie(
  headersOrRawCookie: Record<string, string> | string
): Maybe<UserCookie> {
  if (typeof headersOrRawCookie !== 'string') {
    headersOrRawCookie = headersOrRawCookie.cookie
  }

  if (!headersOrRawCookie) {
    return undefined
  }

  const cookies = parse(headersOrRawCookie)

  if (!cookies[UserCookieName]) {
    return undefined
  }

  return JSON.parse(cookies[UserCookieName]) as UserCookie
}

export function userJwtFromCookie(
  headersOrRawCookie: Record<string, string> | string
): Maybe<string> {
  const c = getUserCookie(headersOrRawCookie)

  if (!c) {
    return undefined
  }

  return c.jwt
}
