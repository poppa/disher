import { getFullUserProfile } from '$lib/gql'
import type { DisherContext } from '$types/context'
import type { RequestHandler } from '@sveltejs/kit'

export const get: RequestHandler<DisherContext> = async ({ params }) => {
  const p = await getFullUserProfile(params.profile)

  if (!p) {
    return {
      status: 404,
      body: {
        statusText: 'User profile not found',
      },
    }
  }

  return {
    body: {
      user: p,
    },
  }
}
