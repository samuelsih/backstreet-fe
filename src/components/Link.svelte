<script>
	import { goto } from '$app/navigation';
	import { fetchLinkRequest } from '../routes/store';
	import suiteLink from '$lib/linkValidation';
	import Alert from './Alert.svelte';

	let formState = {
		redirect_to: "",
		alias: ""
	}
	let pending = false
	let result = suiteLink.get()
	let errorFetchMessage = ""
	let hasError = false

	const handleChange = (/** @type {string} */ fieldName) => {
		result = suiteLink(formState, fieldName)
	}

	const handleLinkRequests = async () => {
		if( !(result.isValid("alias") && result.isValid("redirect_to")) ) {
			return
		}

		pending = true
		hasError = false
		
		try {
			const data = await fetchLinkRequest(formState.alias, formState.redirect_to)
			
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
				<label for="redirect_to" class="block text-sm font-medium text-gray-700">URL</label>
				<div class="mt-1">
					<input
						id="redirect_to"
						name="redirect_to"
						type="text"
						class="w-full border-gray-900 rounded-lg shadow-sm"
						placeholder="Enter your URL here"
						bind:value={formState.redirect_to}
						on:input={() => handleChange("redirect_to")}
					/>
					{#if result.getErrors("redirect_to").length }
						<p class="mt-1 text-xs text-gray-900">{result.getErrors("redirect_to")[0]}</p>
					{/if}
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
						bind:value={formState.alias}
						on:input={() => handleChange("alias")}
					/>
				</div>
				{#if result.getErrors("alias").length }
					<p class="mt-1 text-xs text-gray-900">{result.getErrors("alias")[0]}</p>
				{/if}
			</div>

			<div>
				<button
					type="submit"
					class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
					on:click={handleLinkRequests}
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
