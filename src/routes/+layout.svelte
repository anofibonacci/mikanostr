<script lang="ts">
	import { defaultRelays } from '$lib/stores/relays'
	import { NDKRelay } from '@nostr-dev-kit/ndk'
	import TimeAgo from 'javascript-time-ago'
	import en from 'javascript-time-ago/locale/en'

	TimeAgo.addDefaultLocale(en)

	import '../app.css'
	
	export const prerender = false

	let displayRelayInfo = false

	function getRelayInfo(relayUrl: string) {
		const relay = new NDKRelay(relayUrl)
		return relay.status
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="fixed bottom-0 left-0 text-4xl opacity-90 m-2 hidden md:block cursor-pointer hover:opacity-100"
	on:click={() => {
		displayRelayInfo = !displayRelayInfo
	}}
>
	⚙️
</div>
{#if displayRelayInfo}
	<div
		class="fixed bottom-12 left-0 hidden md:block p-5 m-2 rounded-lg shadow-lg bg-purple-900 text-white"
	>
		<div class="font-bold text-lg mb-3">Relays</div>

		<ul class="list-none">
			{#each defaultRelays as relayUrl}
				<li>
					<b>{relayUrl}</b>
					{#await getRelayInfo(relayUrl)}
						<span class="text-gray-400"> (loading...)</span>
					{:then info}
						<span class="text-gray-400">
							(status: {info})
						</span>
					{:catch error}
						<span class="text-red-400"> (error)</span>
					{/await}
				</li>
			{/each}
		</ul>
	</div>
{/if}

<div class="flex flex-col min-h-screen items-center">
	<div class="flex flex-col items-center max-w-2xl w-full flex-grow">
		<slot />
	</div>
	<footer class="bottom-0 p-5 bg-black font-mono text-white w-full text-center mt-12">
		<div class="flex justify-center flex-row">
			<div class="text-sm">
				🍊 MIKANOSTR (a ripoff of AnaNostr by
				<a class="text-purple-50 hover:text-purple-400" href="https://pablof7z.com">
					@pablof7z
				</a>)
			</div>
		</div>
	</footer>
</div>
