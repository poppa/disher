import type { Maybe } from './types'

export interface DisherContext {
  user: Maybe<DisherUser>
}

export interface DisherUser {
  id: string
  username: string
  role: string
  avatar?: string
}
