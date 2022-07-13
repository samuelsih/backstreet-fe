<script>
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import { fetchFileRequest } from '../routes/store';
	import suiteFile from '$lib/fileValidation';
	import Alert from './Alert.svelte';

	let formState = {
		alias: ""
	}
	let pending = false
	let result = suiteFile.get()
	let errorFetchMessage = ""
	let hasError = false

	/**
    * @type {any}
    */
    let file;
	let errorFile = ""
	let isFileValid = false

	function checkFileSize() {
		if(browser) {
			file = document.getElementById('file');
			const fileStats = file.files[0];
			const maxSize = 33554432 / (1024 ** 2)
			const size = fileStats.size / (1024 ** 2);
			
			if( (size > maxSize) || (fileStats === null) ) {
				errorFile = "Max file size is 32MB"
				isFileValid = false
			}
			
			else {
				isFileValid = true
			}
		}

		else {
			isFileValid = false
		}
	}

	const handleChange = () => {
		result = suiteFile(formState)
	}

    const handleFileRequests = async () => {
		if( !result.isValid("alias") || !isFileValid) {
			return
		}

		pending = true
		hasError = false

		try {
			const data = await fetchFileRequest(formState.alias, file)
			
			if(data.hasOwnProperty("error")) {
				throw new Error(data.error)
			} else {
				errorFetchMessage = ""
				goto(`/claim/${data.alias}`)
			}

		} catch (e) {
			hasError = true
			pending = false
			errorFetchMessage = String(e)
		}

	}
</script>

{#if hasError}
	<div class="max-w-sm mx-auto">
		<Alert errorMessage={errorFetchMessage}/>
	</div>
{/if}


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
						bind:value={formState.alias}
						on:input={handleChange}
					/>
				</div>
				{#if result.getErrors("alias").length }
					<p class="mt-1 text-xs text-gray-900">{result.getErrors("alias")[0]}</p>
				{/if}
			</div>

			<div>
				<label for="file" class="block text-sm font-medium text-gray-700">File</label>
				<div class="mt-1">
					<input type="file" id="file" name="file" required class="file" on:change={checkFileSize}/>
				</div>
				{#if errorFile.length }
					<p class="mt-1 text-xs text-gray-900">{errorFile}</p>
				{/if}
			</div>

			<div>
				<button
					type="submit"
					class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
					on:click={handleFileRequests}
				>
					{#if pending}
						Loading
					{:else}
						Create
					{/if}
				</button>
			</div>
		</div>
	</div>
</div>
