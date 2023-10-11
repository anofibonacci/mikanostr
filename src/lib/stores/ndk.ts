import { browser } from '$app/environment';
import NDK from '@nostr-dev-kit/ndk';
import { writable } from 'svelte/store';

import { defaultRelays } from '$lib/stores/relays';
//console.log('defaultRelays', defaultRelays);

const _ndk = new NDK({
    explicitRelayUrls: defaultRelays,
    debug: false
});
if (browser) {
    _ndk.connect().then(() => console.log('NDK Connected'));
}

// Create a singleton instance that is the default export
const ndk = writable(_ndk);

export default ndk;