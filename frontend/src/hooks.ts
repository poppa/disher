import type { Incoming } from '@sveltejs/kit'
import type { DisherContext } from './types/context'
import * as cookie from 'cookie'
import { UserCookieName } from '$lib/constants'

export async function getContext({
  headers,
}: Incoming): Promise<DisherContext> {
  const cookies = cookie.parse(headers.cookie || '')

  if (cookies[UserCookieName]) {
    console.log(`Yay got user cookie:`, cookies[UserCookieName])
  } else {
    console.log(`No user cookie`)
  }

  return {
    user: undefined,
  }
}

export async function getSession({
  context,
}: {
  context: DisherContext
}): Promise<unknown> {
  // console.log(`Get Session:`, context)

  if (context.user) {
    return {
      session: true,
    }
  }
}
