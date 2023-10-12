<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte'
	import PostForm from '$lib/components/PostForm.svelte'
	import PostSummary from '$lib/components/PostSummary.svelte'
	import ndk from '$lib/stores/ndk'
	import { goto } from '$app/navigation'

	let showForm = false

	function toggleShowForm() {
		showForm = !showForm
	}

	const eventsPromise = $ndk.fetchEvents({
		kinds: [120 as number]
	})

	// still to implement:
	// sort array eventsPromise by created_at

	function posted(event) {
		const eventId = event.detail
		showForm = false
		// goto(`/e/${eventId}`);
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
