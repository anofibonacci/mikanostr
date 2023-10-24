<script lang="ts">
	import ndk from '$lib/stores/ndk'
	//import login from '../../routes/login.svelte'
	import { currentUser } from '$lib/stores/currentUser'
	//import { userProfileExists, userProfile } from '$lib/stores/userProfile'
	import { fetchOwnNpub } from '$lib/utils/login'
	//import { signAndPublishEvent } from '$lib/utils/helpers'
	//import { testingRelay } from '$lib/stores/relays'
	import { get } from 'svelte/store'
	import dayjs from 'dayjs';

	import PostTypeSelector from './PostTypeSelector.svelte'
	import { nostrNotes } from '$lib/stores/store'
	import { onMount } from 'svelte'
	import { validateEvent } from 'nostr-tools'
	import { createEventDispatcher } from 'svelte'
	import { NDKEvent, NDKRelay, NDKRelaySet } from '@nostr-dev-kit/ndk'

	const dispatch = createEventDispatcher()

	let ownPubkey = 'loading'
	//let publishEventId

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

		// from NDK readme:
		/*
		const ndkEvent = new NDKEvent($ndkStore);
		ndkEvent.kind = 1;
		ndkEvent.content = "Konnichiwa!\nCan't believe we'll be in 🇯🇵 so soon!";
		//ndkEvent.publish(); // This will trigger
		*/

		const event = new NDKEvent($ndk)
		event.kind = 120
		event.content = JSON.stringify(data)
		event.created_at = dayjs().unix()
		event.tags = []
		event.pubkey = ownPubkey

		/*
		let event = new NDKEvent(ndk);
		event = {
			kind: 120,
			content: JSON.stringify(data),
			created_at: Math.floor(Date.now() / 1000),
			tags: [],
			pubkey: ownPubkey
		}
		*/
		console.log('event to be sent: ', event)

		//const signedEvent: NDKEvent = await window.nostr.signEvent(event)
		//console.log('signed event: ', signedEvent);
		//signedEvent.publish();

		/*
		signedEvent.publish().then(() => {
			return json({ signedEvent }, { status: 200 });
		}).catch((error) => {
			return json({ error: `Unable to publish note: ${error}` }, { status: 422 });
		});
		*/

		/*
		// relay
		const relay = new NDKRelay(testingRelay);
		console.log('testingRelay: ', testingRelay);
		// relaySet
		const relaySet = new NDKRelaySet(relay, $ndk);
		console.log('relaySet: ', relaySet);
    	let publishedEvent = await event.publish(relaySet);
		*/

		//	let publishedEvent = event;
		//    console.log('(not)published event: ', publishedEvent);
		let publishedEvent = await event.publish()
		console.log('published event: ', publishedEvent)

		//publishedEventId = publishedEvent.id;
		//console.log('publishedEventId: ', publishedEventId);

		// dispatch custom event
		//dispatch('post', publishedEvent.id);
		dispatch('post', publishedEvent)
	}

	//$: publishedEventId && dispatch('post', publishedEventId)

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
						You can only use ANANOSTR in read-only mode until you install a Nostr
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
