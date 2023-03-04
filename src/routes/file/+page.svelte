<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import { FileSchema } from '$lib/types/schema';
	import toast from 'svelte-french-toast';

	let input = {
		alias: '',
		file: new Blob()
	};

	let err = {
		alias: '',
		file: ''
	};

	const checkInput = (): void => {
		console.log(input.file);

		const parsed = FileSchema.safeParse(input);
		if (!parsed.success) {
			const { alias, file } = parsed.error.flatten().fieldErrors;
			err = {
				alias: alias !== undefined ? alias[0] : '',
				file: file !== undefined ? file[0] : ''
			};

			return;
		}

		err.alias = '';
		err.file = '';
	};

	const submitFile: SubmitFunction = ({ cancel }) => {
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
			<span class="block xl:inline"> File </span>
		</h1>
	</section>

	<div class="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
		<form
			class="mb-0 space-y-6"
			method="POST"
			action="?/file"
			enctype="multipart/form-data"
			use:enhance={submitFile}
		>
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
						bind:value={input.alias}
						on:input={checkInput}
					/>
					<span class="mt-1 text-xs text-gray-900">{err.alias}</span>
				</div>
			</div>

			<div>
				<label for="file" class="block text-sm font-medium text-gray-700">File</label>
				<div class="mt-1">
					<input
						type="file"
						id="file"
						name="file"
						required
						class="file"
						bind:value={input.file}
						on:change={checkInput}
					/>
				</div>
				<span class="mt-1 text-xs text-gray-900">{err.file}</span>
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
