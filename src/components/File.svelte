<script>
	import { required, min, max, pattern } from 'svelte-forms/validators';
	import { form, field } from 'svelte-forms';
	import { fetchFileRequest } from '../routes/store';
	import { browser } from '$app/env';
	import { goto } from "$app/navigation";

    let errorFetchMessage = ''

    /**
    * @type {any}
    */
    let file;
    let isFileValid = false

	function checkFileSize() {
		if(browser) {
			file = document.getElementById('file');

			const fileStats = file.files[0];

			const maxSize = 33554432 / (1024 ** 2)
			const size = fileStats.size / (1024 ** 2);


			if( (size > maxSize) || (fileStats === null) ) {
				errorFetchMessage = "Max file size is 32MB"
				isFileValid = false
			}

			else {
				isFileValid = true
			}
		}
	}

	const Alias = field('alias', '', [
		required(),
		min(5),
		max(30),
		pattern(new RegExp('^[A-Za-z0-9]*$'))
	]);
    
	
	const myForm = form(Alias);


	async function setFileRequest() {
		myForm.validate()

		if ($myForm.valid && isFileValid) {
			try {
				const data = await fetchFileRequest($Alias.value, file)

				if(data.hasOwnProperty("error")) {
					errorFetchMessage = data.error
				} 

				else {
					errorFetchMessage = ''
					goto(`/claim/${data.alias}`)
				}


			} catch (err) {
				// errorFetchMessage = 'Error occured. Please try again in a few minutes.'
				errorFetchMessage = `${err}`
			}
		}
	}
	
</script>

<div
	class="p-4 my-8 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 sm:mx-auto sm:w-full sm:max-w-md h-15"
	role="alert"
>
	<span class="font-medium">
		{#if $myForm.hasError('alias.required')}
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
				<label for="alias" class="block text-sm font-medium text-gray-700">Alias</label>
				<div class="mt-1">
					<input
						id="alias"
						name="alias"
						type="text"
						required
						class="w-full border-gray-900 rounded-lg shadow-sm"
						placeholder="Enter your custom link here"
						bind:value={$Alias.value}
					/>
				</div>
				<p class="mt-1 text-xs text-gray-600">Created Link : backstreet.link/{$Alias.value}</p>
			</div>

			<div>
				<label for="file" class="block text-sm font-medium text-gray-700">File</label>
				<div class="mt-1">
					<input type="file" id="file" name="file" required class="file" on:change={checkFileSize}/>
				</div>
			</div>

			<div>
				<button
					type="submit"
					class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
					on:click={() => setFileRequest()}
					>
					Create
				</button>
			</div>
		</div>
	</div>
</div>
