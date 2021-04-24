import type { DisherUser } from './context'
import type { Maybe } from './types'

export interface DisherSession {
  user: Maybe<DisherUser>
}
