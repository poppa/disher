import type { DisherUser } from '$types/context'

// FIXME: This shouldn't be in backend
export interface UserCookie {
  jwt: string
  user: DisherUser
}
