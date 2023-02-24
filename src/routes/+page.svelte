<script lang="ts">
	import ButtonGroup from '../components/ButtonGroup.svelte';
	import File from '../components/File.svelte';
	import Link from '../components/Link.svelte';

	import { indexClickedBtn } from './checker';

	const components = [Link, File];
	$: current = components[0];

	//subscribe = value dari indexClickedBtn berubah ==> ubah nilai dari variable current
	indexClickedBtn.subscribe((value) => (current = components[value]));
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

<svelte:component this={current} />
