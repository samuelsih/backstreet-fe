<script>
	import { fetchLinkRequest } from '../routes/store';
	import { form, field } from 'svelte-forms';
	import { url, required, min, max, pattern } from 'svelte-forms/validators';
	import { goto } from "$app/navigation";

	const Alias = field('alias', '', [
		required(),
		min(5),
		max(30),
		pattern(new RegExp('^[A-Za-z0-9]*$'))
	]);
	const RedirectTo = field('redirect_to', '', [required(), url()]);

	const myForm = form(Alias, RedirectTo);
	let errorFetchMessage = ``

	async function setLinkRequest() {
		myForm.validate();

		if ($myForm.valid) {
			try {
				const data = await fetchLinkRequest($Alias.value, $RedirectTo.value)
				if(data.hasOwnProperty("error")) {
					errorFetchMessage = data.error
				} 

				else {
					errorFetchMessage = ''
					goto(`/claim/${data.alias}`)
				}


			} catch (err) {
				errorFetchMessage = 'Error occured. Please try again in a few minutes.'
			}
		}
	}

</script>

<div
	class="p-4 my-8 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 sm:mx-auto sm:w-full sm:max-w-md h-15"
	role="alert"
>
	<span class="font-medium">
		{#if $myForm.hasError('redirect_to.required')}
			URL is required
		{:else if $myForm.hasError('redirect_to.url')}
			Please input valid URL
		{:else if $myForm.hasError('alias.required')}
			Alias is required
		{:else if $myForm.hasError('alias.min')}
			Alias must be at least 5 characters
		{:else if $myForm.hasError('alias.max')}
			Alias must be lower/equal than 30 characters
		{:else if $myForm.hasError('alias.pattern')}
			Alias must be alphanumeric only
		{:else if errorFetchMessage !== ''}
			{errorFetchMessage}
		{:else}
			Fill this form 🤡
		{/if}
	</span>
</div>

<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
	<div class="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
		<div class="mb-0 space-y-6">
			<div>
				<label for="redirect_to" class="block text-sm font-medium text-gray-700">URL</label>
				<div class="mt-1">
					<input
						id="redirect_to"
						name="redirect_to"
						type="text"
						class="w-full border-gray-900 rounded-lg shadow-sm"
						placeholder="Enter your URL here"
						bind:value={$RedirectTo.value}
					/>
				</div>
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
						bind:value={$Alias.value}
					/>
				</div>
				<p class="mt-1 text-xs text-gray-600">Created Link : backstreet.link/{$Alias.value}</p>
			</div>

			<div>
				<button
					type="submit"
					class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
					on:click={() => setLinkRequest()}
				>
					Create
				</button>
			</div>
		</div>
	</div>
</div>
