<script lang="ts">
	//import { onMount } from 'svelte';
	import NavBar from '$lib/components/NavBar.svelte'
	import PostForm from '$lib/components/PostForm.svelte'
	import PostSummary from '$lib/components/PostSummary.svelte'
	import ndk from '$lib/stores/ndk'
	//import { nostrNotes, posts } from '$lib/stores/store'
	import { goto } from '$app/navigation'
	//import { processEvent} from '$lib/nostr'

	let showForm = false

	function toggleShowForm() {
		showForm = !showForm
	}

	const eventsPromise = $ndk.fetchEvents({
		kinds: [120 as number]
	})

	// attempted to draw events from subscription instead...
	/*
	let events = [];
	const eventsSub = $ndk.subscribe({ kinds: [120] });
		eventsSub.on('event', (event) => {
			console.log(...events, event);
		});
		eventsSub.on('eose', () => {
			console.log('EOSE');
		});
		eventsSub.on('notice', (notice) => {
			console.log(notice);
		});
	*/

	// still to implement:
	// sort array eventsPromise by created_at

	//async function processEvent(event: NDKEvent) {
	//try { event.content = JSON.parse(event.content); } catch (e) { /* empty */ }
	/*
		if (event.kind === 2) {
			console.log(`got post ${event.id}`);
		} else if (event.kind === 120) {
			console.log(`it's a 120 post ${event.id}`);
			posts.update((posts) => {
				if (!posts.find((p) => p.id === event.id)) {
					posts.unshift(event)
					//this.reqProfile(event.pubkey);
				}
				console.log(`there are posts: ${posts.length}`);
				//if (posts.length > 17) { console.log(`posts: ${posts}`);}
				return posts;
			})
		}
		nostrNotes.update((notes) => {
			notes[event.id] = event;
			console.log(`there are notes: ${Object.values(notes).length}`);
			if (Object.values(notes).length > 17) { console.log(`notes: ${notes}`);}
			return notes;
		});
	}*/

	function posted(event: NDKEvent) {
		//const event = event
		showForm = false
		//goto(`/e/${eventId}`);
		console.log('posted event: ', event)
	}
</script>

<NavBar />

{#if !showForm}
	<button
		on:click={toggleShowForm}
		class="mt-3 w-full text-center md:rounded-md border border-transparent bg-purple-900 px-6 py-5 text-base font-medium text-white shadow-sm hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex flex-row items-center justify-center"
	>
		<img src="https://nostrica.com/images/shaka.png" alt="" class="mr-3" />
		<h1>Add a post</h1>
	</button>
{:else}
	<PostForm on:post={posted} />
{/if}

<div class="my-4 w-full rounded">
	{#await eventsPromise then events}
		{#each Array.from(events) as post}
			<div
				class="flex flex-row py-5 bg-white w-full md:mb-4 md:rounded md:shadow border-b-gray-300 border-b max-h-24"
				on:click={() => goto(`/e/${post.id}`)}
				on:keypress={() => {}}
			>
				<PostSummary {post} />
			</div>
			<!--p><a href="/e/${post.id}">click</a></p-->
		{/each}
	{/await}
</div>
