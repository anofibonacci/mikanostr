<script lang="ts">
	//import { onMount } from 'svelte';
	import NavBar from '$lib/components/NavBar.svelte'
	import PostForm from '$lib/components/PostForm.svelte'
	import PostSummary from '$lib/components/PostSummary.svelte'
	import ndk from '$lib/stores/ndk'
	import type { NDKEvent } from '@nostr-dev-kit/ndk'
	//import { nostrNotes, posts } from '$lib/stores/store'
	import { goto } from '$app/navigation'

	let showForm = false

	function toggleShowForm() {
		showForm = !showForm
	}

	/*
	const eventsPromise = $ndk.fetchEvents({
		//kinds: [121 as number]
		kinds: [120 as number]
	})
	// switching to draw events from subscription instead of fetch...
	*/

	let events: NDKEvent[] = [];
	function fetchEventsFromSub() {
		const eventsSub = $ndk.subscribe({ kinds: [120] }, { closeOnEose: false });

		eventsSub.on('event', (event) => {
			events.push(event);
			events = events;
			//console.log(...events, event);
			//console.log("subs event: ", event);
		});
		eventsSub.on('eose', () => {
			console.log('EOSE');
		});
		eventsSub.on('notice', (notice) => {
			console.log(notice);
		});
	}
	fetchEventsFromSub();
	// still need to fix: sort array events by created_at
	events.sort((a, b) => {
		if (a.created_at && b.created_at) {
			return b.created_at - a.created_at;
		} else {
			return 0;
		}
	});

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

        // annotate events this event references
        for (let tag of event.tags) {
            const [ type, eventId ] = tag;
            if (type === 'e') {
                nostrNotes.update((notes) => {
                    notes.responses[eventId] = notes.responses[eventId] || [];

                    // don't add duplicate responses
                    if (!notes.responses[eventId].includes(event.id)) {
                        notes.responses[eventId].push(event.id);
                    }

                    // sort responses by timestamp
                    notes.responses[eventId].sort((a, b) => {
                        return notes[a].created_at - notes[b].created_at;
                    }).reverse();

                    return notes;
                });
            }
        }
	}*/

	function findTagsForEvent(event: NDKEvent) {
        console.log("tags: ",event.tags)
        for (let tag of event.tags) {
            const [ type, eventId ] = tag;
            if (type === 'e') {
				console.log(`it's a ${event.kind} post ${event.id}`);
				console.log(tag);
				/*
                nostrNotes.update((notes) => {
                    notes.responses[eventId] = notes.responses[eventId] || [];

                    // don't add duplicate responses
                    if (!notes.responses[eventId].includes(event.id)) {
                        notes.responses[eventId].push(event.id);
                    }

                    // sort responses by timestamp
                    notes.responses[eventId].sort((a, b) => {
                        return notes[a].created_at - notes[b].created_at;
                    }).reverse();

                    return notes;
                });
				*/
            }
        }
	}

	function posted(event: NDKEvent) {
		//const event = event
		showForm = false
		//goto(`/e/${eventId}`);
		console.log('posted event: ', event)
	}

	/*
	After await eventsPromise below,
	I'd like to filter by content > categories > events > nostrasia 
	// "{"type":"climbing","title":"any climbers?","categories":[{"events":["nostrica"]}]}"
	*/
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


{#if events.length > 0}
	<div class="my-4 w-full rounded">
		{#each events as post}
			<!--{findTagsForEvent(post)}-->
			<div
				class="flex flex-row py-5 bg-white w-full md:mb-4 md:rounded md:shadow border-b-gray-300 border-b max-h-24"
				on:click={() => goto(`/e/${post.id}`)}
				on:keypress={() => {}}
			>
				<PostSummary {post} />
			</div>
			<!--p><a href="/e/${post.id}">click</a></p-->
		{/each}
	</div>
{:else}
	<div>No posts yet...</div>
{/if}
