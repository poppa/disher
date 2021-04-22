import type { Maybe } from './types'

export interface DisherContext {
  user: Maybe<DisherUser>
}

export interface DisherUser {
  id: string
  name: string
  role: string
  email: string
}
