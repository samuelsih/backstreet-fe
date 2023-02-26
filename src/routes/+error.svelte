<script lang="ts">
	import { page } from '$app/stores';
	console.log($page);
</script>

<div class="flex flex-col items-center mt-[50vh]">
	{#if $page.status === 404}
		<h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
			<span class="block xl:inline">{$page.status}</span>
			<span class="block xl:inline">Not Found</span>
		</h1>
	{:else}
		<h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
			<span class="block xl:inline">{$page.status}</span>
			<span class="block xl:inline">{$page.error?.message}</span>
		</h1>
	{/if}
</div>
