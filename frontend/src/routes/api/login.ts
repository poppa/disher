import type { RequestHandler } from '@sveltejs/kit'
import type { DisherContext } from '$types/index'
import type { Login } from '$types/backend'
import { getBackendUrl } from '$lib/backend'
import fetch from 'node-fetch'

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

      return {
        ok: true,
        body: res,
      }
    } else {
      // FIXME: Proper error
      throw new Error('Bad response')
    }
  } catch (err: unknown) {
    console.error('login.post:', err)
  }

  return {
    body: {
      ok: false,
    },
  }
}
