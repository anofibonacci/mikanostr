<script lang="ts">
	import ndk from '$lib/stores/ndk'
	import type { NDKEvent } from '@nostr-dev-kit/ndk'
	import ReplyForm from './ReplyForm.svelte'
	import { nostrNotes, profiles } from '$lib/stores/store'
	import HeadNote from './HeadNote.svelte'
	import Note from './Note.svelte'

	import { onMount } from 'svelte'
	import NavBar from '$lib/components/NavBar.svelte'
	import Avatar from '$lib/components/Avatar.svelte'
	import { page } from '$app/stores'

	export let noteId = $page.params.id
	console.log('noteId: ', noteId)
	let myNote: NDKEvent
	let myContent: any
	export let showReplyForm = false

	onMount(async () => {
		myNote = await $ndk.fetchEvent(noteId)
		//console.log('note (in): ', myNote)
		try {
			myContent = JSON.parse(myNote.content)
		} catch (e) {
			// empty
		}
		//console.log('note content (in): ', myContent)
	})

	function submit({ detail: formData }) {
		let data = {}

		for (let field of formData) {
			const [key, value] = field

			if (key === 'comment') {
				data = value
			}
		}
	}

	function toggleReplyForm() {
		showReplyForm = !showReplyForm
	}
</script>

<NavBar />

{#if noteId}
	<main class="w-full">
		<div class="w-full">
			{#if myNote}
				<div>
					<HeadNote note={myNote} on:interested={toggleReplyForm} />
				</div>
			{/if}
		</div>

		{#if showReplyForm}
			<ReplyForm on:submit={submit} parentId={noteId} />
		{/if}
	</main>
{:else}
	<p>Loading {noteId}</p>
{/if}
