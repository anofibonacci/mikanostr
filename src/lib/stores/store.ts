import { writable } from 'svelte/store'
import { persisted } from 'svelte-local-storage-store'

export const introDismissed = persisted('introDismissed', false)

// these are still slightly used, maybe...
export const nostrNotes = writable({ responses: {} })
export const posts = writable([])
export const profiles = writable({})
