<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import toast from 'svelte-french-toast';

	export let data: PageData;

	const { form, errors, constraints, submitting } = superForm(data.form);

	if ($errors._errors) {
		toast.error($errors._errors[0]);
	}
</script>

<div class="mt-[30vh] sm:mx-auto sm:w-full sm:max-w-md">
	<section class="text-center">
		<h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
			<span class="block xl:inline"> Link </span>
		</h1>
	</section>

	<div class="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
		<form class="mb-0 space-y-6" method="POST">
			<div>
				<label for="redirect_to" class="block text-sm font-medium text-gray-700">URL</label>
				<div class="mt-1">
					<input
						id="redirect_to"
						name="redirect_to"
						type="text"
						class="w-full border-gray-900 rounded-lg shadow-sm"
						placeholder="Enter your URL here"
						bind:value={$form.redirect_to}
						data-invalid={$errors.redirect_to}
						{...$constraints.redirect_to}
					/>
				</div>
				{#if $errors.redirect_to}
					<span class="mt-1 text-xs text-gray-900">{$errors.redirect_to}</span>
				{/if}
			</div>

			<div>
				<label for="alias" class="block text-sm font-medium text-gray-700">Alias</label>
				<div class="mt-1">
					<input
						id="alias"
						name="alias"
						type="text"
						class="w-full border-gray-900 rounded-lg shadow-sm"
						placeholder="Enter your custom link here"
						bind:value={$form.alias}
						data-invalid={$errors.alias}
						{...$constraints.alias}
					/>
				</div>
				{#if $errors.alias}
					<span class="mt-1 text-xs text-gray-900">{$errors.alias}</span>
				{/if}
			</div>

			<div>
				<button
					type="submit"
					class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
				>
					{#if $submitting}
						Submitting
					{:else}
						Create
					{/if}
				</button>
			</div>
		</form>
	</div>
</div>
