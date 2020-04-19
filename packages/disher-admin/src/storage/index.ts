import { ErrorStore } from './error-store'
import { UserStore } from './user-store'

export const errorStore = ErrorStore.get()
export const userStore = UserStore.get()
