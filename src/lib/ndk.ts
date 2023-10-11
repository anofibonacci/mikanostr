import { browser } from '$app/environment';
import NDK from '@nostr-dev-kit/ndk';
//import NDKSvelte from '@nostr-dev-kit/ndk-svelte';
import { writable } from 'svelte/store';

const _ndk = new NDK({
    explicitRelayUrls: [
        'wss://purplepag.es',
        //'wss://5b82-157-245-32-159.eu.ngrok.io',
        'wss://nostr-pub.wellorder.net',
        //'wss://nostr1.tunnelsats.com',
        //'wss://relay.nostr.info',
        'wss://relay.snort.social'
    ],
    debug: false
});
if (browser) {
    _ndk.connect().then(() => console.log('NDK Connected'));
}

// Create a singleton instance that is the default export
const ndk = writable(_ndk);

export default ndk;