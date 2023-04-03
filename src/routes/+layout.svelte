<script lang="ts">
	import '../app.css';
	import 'nprogress/nprogress.css';
	import { Toaster } from 'svelte-french-toast';
	import NProgress from 'nprogress';
	import { navigating } from '$app/stores';

	NProgress.configure({
		minimum: 0.4,
	});

	$: {
		if ($navigating) {
			NProgress.start();
		}

		if(!$navigating) {
			NProgress.done();
		}
	}
</script>

<svelte:head>
	<title>Backstreet.link</title>
</svelte:head>

<main class="layout">
	<slot />
	<Toaster />
</main>

<style>
	.layout {
		max-width: 68.75rem;
		width: 90%;
		margin-left: auto;
		margin-right: auto;
	}
</style>
