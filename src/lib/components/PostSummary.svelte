<script lang="ts">
	import ndk from '$lib/stores/ndk'
	import type { NDKEvent } from '@nostr-dev-kit/ndk'
	import { nostrNotes } from '$lib/stores/store'
	import Avatar from '$lib/components/Avatar.svelte'
	import CalendarIcon from '$lib/components/CalendarIcon.svelte'
	import NoteContent from '$lib/components/NoteContent.svelte'
	import { formatSatoshis } from '$lib/utils/helpers'
	import { massageString } from '$lib/utils/helpers'
	import { intlFormat } from 'date-fns'

	export let post: NDKEvent
	//console.log("ID: ", post.id);
	//console.log("pubkey: ", post.pubkey);
	//console.log("post: ", post);

	const content = JSON.parse(post.content)
	//console.log("content: ", content);
</script>

<div class="flex-shrink px-4">
	<div class="text-gray-900">
		<!-- ID: {post.id} -->
		{#if content.type == 'airport'}
			<span class="text-5xl">🚗</span>
		{:else if content.type === 'lodging'}
			<span class="text-5xl">🏡</span>
		{:else if content.type === 'surfing'}
			<span class="text-5xl">🏄‍♂️</span>
		{:else if content.type === 'climbing'}
			<span class="text-5xl">🧗‍♂️</span>
		{:else if content.type === 'coffee'}
			<span class="text-5xl">☕️</span>
		{:else if content.type === 'psa'}
			<span class="text-5xl">📢</span>
		{:else}
			{content.type}
		{/if}
	</div>
</div>

<div class="flex-grow px-4 overflow-hidden">
	<div class="flex flex-col">
		<div class="flex-1 overflow-hidden">
			<div class="truncate">
				{#if content.title}
					<h2 class="font-semibold text-lg text-purple-900">
						{@html massageString(content.title)}
					</h2>
				{/if}
				<div class="text-gray-500 text-sm mt-1">
					<NoteContent content={content.comment} />
				</div>
			</div>
		</div>
		{#if content.price}
			<div class="flex flex-1 items-end">
				<div class=" bg-slate-100 shadow border px-3 py-1 flex-shrink rounded-xl">
					<img
						src="https://abs.twimg.com/hashflags/Bitcoin_evergreen/Bitcoin_evergreen.png"
						alt="Bitcoin"
						style="width: 1.2em; vertical-align: -20%; margin-right: 0.075em; height: 1.2em; margin-left: 2px; display: inline-block;"
					/>
					<span class="text-gray-900 font-normal text-xs">
						{formatSatoshis(parseInt(content.price), {
							tryThousands: true
						})}
					</span>
				</div>
			</div>
		{/if}
	</div>
</div>

<div class="flex-shrink px-4 flex flex-row items-center gap-1">
	<div class="flex-shrink flex flex-row items-center">
		{#if content.type == 'airport'}
			{#if content.date}
				<CalendarIcon date={content.date} />
			{/if}
		{:else if content.checkIn}
			<div class="mr-2">
				<CalendarIcon date={content.checkIn} endDate={content.checkOut} />
			</div>
		{/if}
	</div>

	<div class="flex flex-col md:flex-row-reverse justify-center md:justify-start items-center">
		<div class="h-10 w-10 flex-shrink-0">
			<Avatar klass="sm:ring-purple-900 sm:ring-2" pubkey={post.pubkey} />
		</div>

		{#if $nostrNotes.responses[post.id]}
			<div
				class="whitespace-nowrap py-2 px-3 text-sm bg-purple-100 text-gray-800 rounded-lg mt-1 md:mr-2 flex flex-row md:flex-col items-center gap-1"
			>
				<span class="font-bold text-md">{$nostrNotes.responses[post.id].length}</span>
				<span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-4 h-4"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
						/>
					</svg>
				</span>
			</div>
		{/if}
	</div>
</div>
