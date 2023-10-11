import { writable, derived } from 'svelte/store';
import type { NDKUser } from '@nostr-dev-kit/ndk';

export const currentUser = writable<NDKUser | null>(null);

export const currentUserExists = derived(
    currentUser,
    ($currentUser) => Boolean($currentUser)
);