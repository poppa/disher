import type { Maybe } from '$types/types'

export interface UserCookie {
  jwt: string
  user: User
}

interface User {
  username: string
  role: string
  avatar: Maybe<string>
  id: string
}
