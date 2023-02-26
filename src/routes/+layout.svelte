<script>
	import '../app.css';
	import { Toaster } from 'svelte-french-toast' 
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