import { parse } from '$lib/cookie'
import type { Incoming } from '@sveltejs/kit'
import type { DisherContext } from './types/context'

export async function getContext({
  headers,
}: Incoming): Promise<DisherContext> {
  const cookies = parse(headers.cookie || '')

  if (cookies.user) {
    console.log(`Yay got user cookie`)
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
