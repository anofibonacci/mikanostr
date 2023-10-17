<script lang="ts">
	import ndk from '$lib/stores/ndk'
	import type { NDKUser } from '@nostr-dev-kit/ndk'
	import { profiles } from '$lib/stores/store'
	import LodgingCard from './LodgingCard.svelte'
	import TimeAgo from 'javascript-time-ago'
	import { createEventDispatcher } from 'svelte'
	import MarkdownIt from 'markdown-it'
	import NoteContent from '$lib/components/NoteContent.svelte'
	import Avatar from '$lib/components/Avatar.svelte'
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime'

	dayjs.extend(relativeTime)

	let md = new MarkdownIt()

	const dispatch = createEventDispatcher()

	export let note
	//console.log('note: ', note)
	export let content = JSON.parse(note.content)
	//console.log('content: ', content)
	let author: NDKUser = $ndk.getUser({ hexpubkey: note.pubkey })
	//console.log('author: ', author);
</script>

<div class="bg-purple-900 text-white border md:rounded-lg p-4 w-full my-4">
	<div class="flex flex-row overflow-clip text-ellipsis items-center">
		{#await author.fetchProfile() then eventSet}
			<Avatar klass="m-2 h-16 ring-8 ring-purple-1000" pubkey={note.pubkey} />
			<!--
			pubkey can be either {note.pubkey} (preferred) or {author.hexpubkey}
			... but not npub={author.npub} 
		-->
			<div class="pl-4 flex flex-col text-ellipsis">
				<div class="font-bold text-xl text-clip">
					{author.profile?.displayName
						? author.profile.displayName
						: author.profile?.name
						? author.profile.name
						: 'unknown'}
				</div>
				<div class="text-xs text-gray-200 mt-1">
					{dayjs().to(dayjs(note.created_at * 1000))}
				</div>
			</div>
		{/await}
	</div>

	{#if content?.type === 'lodging'}
		<LodgingCard {note} />
	{/if}

	<h2 class="mt-4 md:mt-6 px-4 font-bold text-2xl">{content?.title}</h2>

	{#if content?.comment}
		<div class="mt-5 p-4 bg-white rounded text-gray-700">
			<NoteContent content={content?.comment} />
		</div>
	{:else}
		<div class="mt-2 p-2 rounded text-purple-200 text-sm">
			oh brother,
			<em>{note.pubkey?.display_name}</em>
			didn't write anything 🤷‍♂️
		</div>
	{/if}
	<div class="flex flex-col md:flex-row items-end mt-3 justify-end">
		<button
			class="bg-purple-600 text-white px-8 py-2 font-semibold flex-1 md:flex-0"
			on:click={() => {
				dispatch('interested')
			}}
		>
			INTERESTED?
		</button>
	</div>
</div>
