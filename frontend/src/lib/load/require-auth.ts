import type { LoadInput, LoadOutput } from '@sveltejs/kit/types/page'

/**
 * Require authentication in a Load function sequence.
 *
 * If the client isn't authenticated it will be redirected to the login page
 *
 * @note
 * This function should be used in a {@linkcode sequence()}
 *
 * @param input
 * @returns
 */
export function requireAuth({
  session,
  page,
}: LoadInput): LoadOutput | Promise<LoadOutput> {
  if (!session.user) {
    return {
      status: 307,
      redirect: `/login?__from=${page.path}`,
    }
  }

  return { status: 100 }
}
