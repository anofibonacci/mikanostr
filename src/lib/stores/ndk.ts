import { browser } from '$app/environment'
import { NDKNip07Signer } from '@nostr-dev-kit/ndk'
import NDK from '@nostr-dev-kit/ndk'
import { writable } from 'svelte/store'

let nip07signer
if (browser) {
	nip07signer = new NDKNip07Signer()
}

import { defaultRelays } from '$lib/stores/relays'
//console.log('defaultRelays', defaultRelays);

const _ndk = new NDK({
	explicitRelayUrls: defaultRelays,
	signer: nip07signer,
	debug: false
})
if (browser) {
	_ndk.connect().then(() => console.log('NDK Connected'))
}

// Create a singleton instance that is the default export
const ndk = writable(_ndk)

export default ndk
