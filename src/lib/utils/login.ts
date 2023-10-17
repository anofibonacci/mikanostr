//import type { NDKUser } from '@nostr-dev-kit/ndk'
import { currentUser } from '$lib/stores/currentUser'
import { userProfileExists, userProfile } from '$lib/stores/userProfile'

export async function fetchOwnNpub() {
	//console.log('in l:fop')
	try {
		const pubkey = await window.nostr.getPublicKey()
		//console.log('window: ', window)
		//console.log('window.nostr: ', window.nostr)
		//console.log('pubkey: ', pubkey)
		//$currentUser = user as NDKUser
		//this.reqProfile(pubkey);
		//this.subscribe({kinds: [2], authors: [pubkey]})
		return pubkey
	} catch (e) {
		console.log(e)
		throw e
	}
}
