<script>
	import Card from '$lib/components/Card.svelte'
	import { formatSatoshis } from '$lib/utils/helpers'

	export let note
	export let content = JSON.parse(note.content)
</script>

<div class="mt-3">
	<div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-purple-900">
		{#if content.checkIn}
			<Card title="Check-In" value={content.checkIn} />
		{/if}

		{#if content.checkOut}
			<Card title="Check-out" value={content.checkOut} />
		{/if}

		{#if content.roomsAvailable}
			<Card title="Rooms available" value={content.roomsAvailable} />
		{/if}

		{#if content.price}
			<Card title="Price" value={formatSatoshis(content.price)} />
		{/if}

		{#if content.url}
			<Card title="URL">
				<a href={content.url} class="text-purple-900 underline">
					{content.url}
				</a>
			</Card>
		{/if}
	</div>

	<div class="flex flex-col md:flex-row" />
</div>
