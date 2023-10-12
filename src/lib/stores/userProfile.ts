import { writable, derived } from 'svelte/store'
import type { NDKUserProfile } from '@nostr-dev-kit/ndk'

export const userProfile = writable<NDKUserProfile | null>(null)

export const userProfileExists = derived(userProfile, ($userProfile) => Boolean($userProfile))
