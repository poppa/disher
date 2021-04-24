import type { DisherUser, Maybe } from '$types/index'
import { writable } from 'svelte/store'

export const userStore = writable<Maybe<DisherUser>>(undefined)
