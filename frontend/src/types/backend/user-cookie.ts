import type { DisherUser } from '$types/context'

export interface UserCookie {
  jwt: string
  user: DisherUser
}
