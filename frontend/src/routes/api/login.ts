import type { RequestHandler } from '@sveltejs/kit'
import type { DisherContext } from '$types/index'
import type { Login, UserCookie } from '$types/backend'
import { getBackendUrl } from '$lib/backend'
import fetch from 'node-fetch'
import { getUserProfile } from '$lib/gql'
import cookie from 'cookie'
import { UserCookieName } from '$lib/constants'

export const post: RequestHandler<DisherContext> = async ({ body }) => {
  const url = getBackendUrl('/auth/local')

  try {
    const query = await fetch(url, {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (query.ok) {
      const res = (await query.json()) as Login.Result
      console.log(`Login worked...now fetch profile`)

      const profile = await getUserProfile(res.user.id)

      if (!profile) {
        return {
          ok: false,
          status: 404,
        }
      }

      const cookieUser: UserCookie = {
        jwt: res.jwt,
        user: {
          id: profile.id,
          username: profile.username,
          role: res.user.role.name,
          // FIXME: Nullish coalescing and optional chaining doesn't work atm
          avatar: profile.gravatar || (profile.avatar && profile.avatar.url),
        },
      }

      // FIXME: Make path and expiration configurable?
      // FIXME: Encode the cookie value
      const uc = cookie.serialize(UserCookieName, JSON.stringify(cookieUser), {
        path: '/',
        httpOnly: true,
      })

      console.log(`UserCookie:`, uc)

      return {
        ok: true,
        body: cookieUser,
        headers: {
          'Set-Cookie': uc,
        },
      }
    } else {
      // FIXME: Proper error
      throw new Error('Bad response')
    }
  } catch (err: unknown) {
    console.error('login.post:', err)
  }

  return {
    status: 500,
    body: {
      ok: false,
    },
  }
}
