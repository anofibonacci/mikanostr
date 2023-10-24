<script lang="ts">
	import ndk from '$lib/stores/ndk'
	import { NDKEvent } from '@nostr-dev-kit/ndk'
	import type { NDKUser, NDKUserProfile } from '@nostr-dev-kit/ndk'
	import TimeAgo from 'javascript-time-ago'
	import { onMount, createEventDispatcher } from 'svelte'
	import Avatar from '$lib/components/Avatar.svelte'
	import { goto } from '$app/navigation'
	import dayjs from 'dayjs';

	import { currentUser } from '$lib/stores/currentUser'
	import { fetchOwnNpub } from '$lib/utils/login'

	const dispatch = createEventDispatcher()

	//TimeAgo.addDefaultLocale(en)
	const timeAgo = new TimeAgo('en-US')

	export let ownPubkey = 'loading'
	let me: NDKUser
	let profile: NDKUserProfile
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
		if (ownPubkey != '') {
			console.log('ownPubkey: ', ownPubkey)
			me = $ndk.getUser({ hexpubkey: ownPubkey })
			//console.log('me: ', me)
		}
	})

	export let parentId
	export let replyEvent = new NDKEvent($ndk)

	async function submit(e) {
		e.preventDefault()
		const formData = new FormData(e.target)

		replyEvent.content = formData.get('comment')
		replyEvent.kind = 1
		replyEvent.created_at = dayjs().unix()
		replyEvent.tags = [['e', parentId]]
		replyEvent.pubkey = ownPubkey

		console.log('replyEvent: ', replyEvent)

		let publishedReplyEvent = await replyEvent.publish()
		console.log('published reply event yields Set of Relays: ', publishedReplyEvent)
		dispatch('post', publishedReplyEvent);
		goto('/')
	}
</script>

<div
	class="bg-white border border-l-purple-900 border-l-8 rounded-l-none rounded-lg p-4 w-full text-gray-700 my-4"
>
	<form method="POST" action="?post" on:submit={submit} id="add-form" class="w-full">
		<div class="flex flex-row">
			{#await me?.fetchProfile() then profile}
				<Avatar
					klass="m-2 h-16 w-16 ring-4 ring-purple-700 rounded-full"
					pubkey={ownPubkey}
				/>
				<div class="pl-6 flex flex-col flex-1 overflow-hidden">
					<div class="font-bold text-xl truncate">
						<span>{profile?.displayName} {profile?.name}</span>
					</div>

					<div class="mt-5 bg-slate-50 border">
						<textarea
							rows="3"
							name="comment"
							id="comment"
							class="block border-0 w-full bg-white text-black resize-none focus:resize-y hover:resize"
						/>
					</div>

					<div class="flex">
						<button
							type="submit"
							class="flex-1 rounded-t-none text-center rounded-md border border-transparent bg-purple-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-800 focus:outline-none ocus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex flex-row items-center justify-center"
						>
							<span class="mr-2">🤙</span>
							<div class="flex flex-col items-start">Post it!</div>
						</button>
					</div>
				</div>
			{/await}
		</div>
	</form>
</div>
