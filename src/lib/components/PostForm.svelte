<script lang="ts">
	import ndk from '$lib/stores/ndk'
	import { currentUser } from '$lib/stores/currentUser'
	import { fetchOwnNpub } from '$lib/utils/login'
	import dayjs from 'dayjs';

	import PostTypeSelector from './PostTypeSelector.svelte'
	import { nostrNotes } from '$lib/stores/store'
	import { onMount } from 'svelte'
	import { createEventDispatcher } from 'svelte'
	import { NDKEvent } from '@nostr-dev-kit/ndk'

	const dispatch = createEventDispatcher()

	let ownPubkey = 'loading'

	onMount(async () => {
		const npub = await fetchOwnNpub()
		ownPubkey = npub ? npub : ''
		//console.log('ownPubkey (1): ', ownPubkey)
		if (ownPubkey == '' && currentUser.npub != undefined) {
			console.log('currentUser (if): ', currentUser)
			console.log('currentUser.npub: ', currentUser.npub)
			console.log('ownPubkey (2): ', ownPubkey)
			ownPubkey = currentUser.npub
		} else if (ownPubkey == '') {
			console.log('ownPubkey (3) is empty')
		}
		//console.log('ownPubkey (4): ', ownPubkey)
	})

	function validate(data) {
		const validTypes = ['lodging', 'airport', 'coffee', 'surfing', 'climbing', 'psa']

		if (!data.type || !validTypes.includes(data.type)) {
			return false
		}

		return true
	}

	async function submit(e) {
		e.preventDefault()
		const formData = new FormData(e.target)
		const data = {}

		for (let field of formData) {
			const [key, value] = field
			data[key] = value
		}

		if (!validate(data)) {
			return
		}

		data.categories = [{ events: ['nostrasia'] }]
		//console.log('data: ', data)

		const event = new NDKEvent($ndk)
		event.kind = 121
		//event.kind = 120
		event.content = JSON.stringify(data)
		event.created_at = dayjs().unix()
		event.tags = []
		event.pubkey = ownPubkey

		let publishedEvent = await event.publish()
		console.log('published event: ', publishedEvent)

		//let publishedEventId = publishedEvent.id;
		dispatch('post', publishedEvent)
	}

	// hack? what hack?
	//$: publishedEventId && $nostrNotes[publishedEventId] && dispatch('post', publishedEventId)
</script>

<div class="my-4 w-full">
	{#if ownPubkey == ''}
		<div class="bottom-0 p-3 bg-red-600 border-red-800 border-8 text-white w-full text-center">
			<div class="flex justify-center flex-row items-center">
				<img
					src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.mR6qbzeucpJw74GqX5k8igHaEo%26pid%3DApi&f=1&ipt=84829f0f55dbaf2de493d3df75995f52abbe4d22b44d094924f54655a133137f&ipo=images"
					alt=""
					width="300"
					class="mr-5"
				/>
				<div class="flex-1">
					<h1>NO NOSTR FOR YOU!</h1>
					<p class="mt-5">
						You can only use MIKANOSTR in read-only mode until you install a Nostr
						extension.
					</p>
					<p class="mt-8">
						<a
							href="https://getalby.com"
							class="bg-red-900 text-white px-4 py-2 text-xs rounded">Install Alby</a
						>
						<a
							href="https://github.com/fiatjaf/nos2x"
							class="bg-red-900 text-white px-4 py-2 text-xs rounded">Install Nos2x</a
						>
					</p>
				</div>
			</div>
		</div>
	{:else}
		<div class="bg-purple-600 text-white">
			<form method="POST" action="?post" on:submit={submit} id="post-form">
				<div class="px-6 py-4">
					<h1>Have something to share?</h1>

					<div class="my-3">
						<PostTypeSelector />
					</div>
				</div>

				<button
					type="submit"
					class="w-full text-center rounded-md border border-transparent bg-purple-900 px-6 py-5 text-base font-medium text-white shadow-sm hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex flex-row items-center justify-center"
				>
					<img src="https://nostrica.com/images/shaka.png" alt="" class="mr-3 h-full" />
					<div class="flex flex-col items-start">
						<h1>Post it!</h1>
						<!-- <h3 class="text-sm text-purple-200 font-light">(0 sats)</h3> -->
					</div>
				</button>
			</form>
		</div>
	{/if}
</div>
