import type { RequestHandler } from '@sveltejs/kit'
import cookie from 'cookie'
import { UserCookieName } from '$lib/constants'
import type { DisherContext } from '$types/context'

export const get: RequestHandler<DisherContext> = ({ locals }) => {
  const c = cookie.serialize(UserCookieName, '', {
    path: '/',
    httpOnly: true,
    maxAge: -1,
  })

  delete locals.user

  return {
    status: 200,
    body: {
      ok: true,
    },
    headers: {
      'Set-Cookie': c,
      'Cache-Control': 'must-revalidate',
      'Max-Age': '0',
    },
  }
}
