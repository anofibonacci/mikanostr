<script>
	import { profiles } from '$lib/store'

	export let pubkey
	export let klass

	let picture

	$: picture = $profiles[pubkey]?.picture || `https://robohash.org/${pubkey}.png?set=set3&bgset=bg1`
</script>

<img class="{klass} ring-4 ring-white rounded-full" src={picture} alt="" />

<!--
// REMOVE everything above this line and replace with the following:
<script lang="ts">
    import ndk from '$lib/ndk';
    import type { NDKUser } from '@nostr-dev-kit/ndk';
    import {Avatar} from '@nostr-dev-kit/ndk-svelte-components';

    export let pubkey: string | undefined = undefined;
    export let user: NDKUser | undefined = undefined;
    export let klass: string = $$props.class??'';
    export let size: 'small' | 'large' | undefined = undefined;
    export let type: 'square' | 'circle' = 'circle';

    let sizeClass = '';
    let shapeClass = '';

    switch (size) {
        case 'small':
            sizeClass = 'w-8 h-8';
            break;
    }

    switch (type) {
        case 'circle':
            shapeClass = 'rounded-full';
            break;
        case 'square':
            shapeClass = 'rounded-md';
            break;
    }
</script>

<Avatar
    ndk={$ndk}
    {pubkey}
    {user}
    class="{shapeClass} {sizeClass} {$$props.class??klass}"
/>

// $profiles[pubkey]?.picture || `https://robohash.org/${pubkey}.png?set=set3&bgset=bg1`

-->