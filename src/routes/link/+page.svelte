<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import { LinkSchema } from '$lib/types/schema';
	import toast from 'svelte-french-toast';

	let input = {
		alias: "",
		redirect_to: ""
	}

	let err = {
		alias: "",
		redirect_to: ""
	}

	const checkInput = (): void => {
		const parsed = LinkSchema.safeParse(input)
		if(!parsed.success) {
			const {alias, redirect_to} = parsed.error.flatten().fieldErrors
			err = {
				alias: (alias !== undefined ? alias[0] : ""),
				redirect_to: (redirect_to !== undefined ? redirect_to[0] : ""),
			}

			return
		}

		err.alias = ""
		err.redirect_to = ""
	}

	const submitLink: SubmitFunction = ({ cancel }) => {
		return async ({ result, update }) => {
			switch (result.type) {
				case 'error':
					toast.error(result.error);
					cancel();
					break;

				case 'failure':
					const { data } = result;
					toast.error(data?.errorMsg);
					cancel();
					break;

				default:
					break;
			}

			await update();
		};
	};
</script>

<div class="mt-[30vh] sm:mx-auto sm:w-full sm:max-w-md">
	<section class="text-center">
		<h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
			<span class="block xl:inline"> Link </span>
		</h1>
	</section>

	<div class="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
		<form class="mb-0 space-y-6" method="POST" action="?/link" use:enhance={submitLink}>
			<div>
				<label for="redirect_to" class="block text-sm font-medium text-gray-700">URL</label>
				<div class="mt-1">
					<input
						id="redirect_to"
						name="redirect_to"
						type="text"
						class="w-full border-gray-900 rounded-lg shadow-sm"
						placeholder="Enter your URL here"
						bind:value={input.redirect_to}
						on:input={checkInput}
					/>
				</div>
				<span class="mt-1 text-xs text-gray-900">{err.redirect_to}</span>
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
						bind:value={input.alias}
						on:input={checkInput}
					/>
				</div>
				<span class="mt-1 text-xs text-gray-900">{err.alias}</span>
			</div>

			<div>
				<button
					type="submit"
					class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
				>
					Create
				</button>
			</div>
		</form>
	</div>
</div>
