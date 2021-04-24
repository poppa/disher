import type { GetSession, Incoming } from '@sveltejs/kit'
import type { UserCookie } from '$types/backend'
import type {
  DisherSession,
  Maybe,
  DisherContext,
  DisherUser,
} from '$types/index'
import cookie from 'cookie'
import { UserCookieName } from '$lib/constants'

export async function getContext({
  headers,
}: Incoming): Promise<DisherContext> {
  const cookies = cookie.parse(headers.cookie || '')
  let user: Maybe<DisherUser> = undefined

  if (cookies[UserCookieName]) {
    const t = JSON.parse(cookies[UserCookieName]) as UserCookie
    user = t.user
  }

  return {
    user,
  }
}

export const getSession: GetSession<DisherContext, DisherSession> = async ({
  context,
}): Promise<DisherSession> => {
  return {
    user: context.user,
  }
}
