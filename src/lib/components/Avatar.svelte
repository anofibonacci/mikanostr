<script lang="ts">
	import type { NDKUser } from '@nostr-dev-kit/ndk';
    import ndk from '$lib/stores/ndk'

	export let pubkey: string
	export let klass: string = ''
	let author: NDKUser = $ndk.getUser({ hexpubkey: pubkey });
    //console.log("author: ", author);

	let robo = `https://robohash.org/${pubkey}.png?set=set3&bgset=bg1`
</script>


{#await author.fetchProfile() then eventSet}
    {#if author.profile?.image}
        <img class="{klass} ring-4 ring-white rounded-full" src={author.profile.image} alt="" />
    {:else if pubkey != ''}
        <img class="{klass} ring-4 ring-white rounded-full" src={robo} alt="" />
    {:else}
        <p>X</p>
    {/if}
{/await}