<script lang="ts">
	import ndk from '$lib/stores/ndk'
	import type { NDKUser } from '@nostr-dev-kit/ndk'
	import { profiles } from '$lib/stores/store'
	import Avatar from '$lib/components/Avatar.svelte'
	import NoteContent from '$lib/components/NoteContent.svelte'
	import TimeAgo from 'javascript-time-ago'

	const timeAgo = new TimeAgo('en-US')

	export let note
	let author: NDKUser = $ndk.getUser({ hexpubkey: note.pubkey })

	console.log("I don't think this page is used (Note.svelte)")
</script>

<div
	class="bg-white border border-l-red-900 border-l-8 rounded-l-none rounded-lg p-4 w-full text-gray-700 my-4"
>
	<div class="flex flex-row overflow-clip text-ellipsis">
		<Avatar klass="ring-purple-900 m-2 h-16" pubkey={note.pubkey} />

		<div class="pl-6 flex flex-col text-ellipsis">
			<div class="font-bold text-xl text-clip">
				{$note.pubkey?.display_name}
			</div>
			<div class="text-xs text-gray-500 mt-1">
				{timeAgo.format(new Date(note.created_at * 1000))}
			</div>

			<div class="mt-5">
				<NoteContent content={note.content} />
			</div>
		</div>
	</div>
</div>
