<script>
	import dayjs from 'dayjs';
	import customParseFormat from 'dayjs/plugin/customParseFormat'

	dayjs.extend(customParseFormat)

	export let date, endDate
	let day, month
	let endDay, endMonth

	let sDate = dayjs(date, 'YYYY-MM-DD')
	let eDate = dayjs(endDate, 'YYYY-MM-DD')

	day = sDate.format('D')
	month = sDate.format('MMM')

	if (endDate) {
		endDay = eDate.format('D')
		endMonth = eDate.format('MMM')
	}
</script>

<div class="bg-white font-medium border-1">
	<div class="flex-none rounded-t lg:rounded-t-none lg:rounded-l text-center shadow-md">
		<div class="block rounded-t overflow-hidden text-center">
			<div
				class="bg-purple-900 text-xs font-semibold uppercase text-white py-1 whitespace-nowrap px-2"
			>
				{#if month && endMonth && month !== endMonth}
					{month} - {endMonth}
				{:else}
					{month}
				{/if}
			</div>
			<div class="py-1 border-l border-r border-white bg-white">
				<span class="text-xl font-bold leading-tight px-2 whitespace-nowrap">
					{#if day && endDay && day !== endDay}
						{day} - {endDay}
					{:else}
						{day}
					{/if}
				</span>
			</div>
			<!-- <div class="border-l border-r border-b rounded-b-lg text-center border-white bg-white -pt-2 -mb-1">
                <span class="text-sm">
                    {dayName}
                </span>
            </div> -->
		</div>
	</div>
</div>
