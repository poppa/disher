import type { LoadInput, LoadOutput } from '@sveltejs/kit/types/page'

export function requireAuth(
  input: LoadInput
): LoadOutput | Promise<LoadOutput> {
  console.log(`*** requireAuth`)
  if (!input.session.user) {
    return {
      status: 307,
      redirect: `/login?__from=${input.page.path}`,
    }
  }

  return { status: 100 }
}
