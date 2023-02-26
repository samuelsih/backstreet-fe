<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	const { alias } = data;

	const copy = () => {
		navigator.clipboard.writeText('backstreet.link/' + alias);
	};
</script>

<div class="mt-[40vh] sm:mx-auto sm:w-full sm:max-w-xl">
	<h1 class="text-2xl tracking-tight text-gray-900 md:text-4xl text-center">
		<span class="block xl:inline">Your Short Link</span>
	</h1>

	<div class="flex items-end mt-8">
		<div class="mr-3 w-full">
			<input
				id="input"
				class="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:border-gray-500 block w-full p-2.5"
				disabled
				readonly
				value={`backstreet.link/${alias}`}
			/>
		</div>
		<div>
			<button
				type="submit"
				class="cursor-pointer text-white bg-gray-900 hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
				on:click={copy}
			>
				Copy
			</button>
		</div>
	</div>
</div>
