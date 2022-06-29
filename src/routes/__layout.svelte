<script>
	import '../app.css';
</script>

<svelte:head>
	<title>Backstreet.link</title>
</svelte:head>

<main class="layout">
	<slot />
</main>

<style>
	.layout {
		max-width: 68.75rem;
		width: 90%;
		margin-left: auto;
		margin-right: auto;
	}
</style>
