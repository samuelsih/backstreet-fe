<script lang="ts">
	import ButtonGroup from '../components/ButtonGroup.svelte';
	import File from '../components/File.svelte';
	import Link from '../components/Link.svelte';
	import type { ActionData } from './$types';
	import { indexClickedBtn } from './checker';

	let index = 0;

	export let formData: ActionData

	//subscribe = value dari indexClickedBtn berubah ==> ubah nilai dari variable current
	indexClickedBtn.subscribe((value) => (index = value));
</script>

<div class="flex flex-col items-center justify-center">
	<section class="text-center mt-24 md:mt-16">
		<h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
			<span class="block xl:inline"> Backstreet.link </span>
		</h1>
	</section>

	<section class="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
		<ButtonGroup />
	</section>
</div>

{#if index === 0}
	<Link formData={formData}/>
{:else}
	<File />
{/if}
