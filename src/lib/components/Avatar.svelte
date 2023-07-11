<script>
	import { profiles } from '$lib/store'

	export let pubkey
	export let klass

	let picture

	$: picture = $profiles[pubkey]?.picture || `https://robohash.org/${pubkey}.png?set=set3&bgset=bg1`
</script>

<img class="{klass} ring-4 ring-white rounded-full" src={picture} alt="" />
