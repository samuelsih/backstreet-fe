<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	import type { PageData } from './$types';

	export let data: PageData;

	const { alias, type, redirect_to, filename } = data.response.response;

	onMount(() => {
		if (browser) {
			if (type === 'LINK') {
				window.history.forward();
				window.location.replace(redirect_to);
			}
		}
	});

	const downloadFile = async () => {
		try {
			const fetched = await fetch(`/api/file?alias=${alias}`, {
				method: 'GET'
			});

			const blob = await fetched.blob();

			const anchor = document.createElement('a');

			const url = URL.createObjectURL(blob);

			anchor.href = url;
			anchor.download = filename;

			document.body.appendChild(anchor);
			anchor.click();
			document.body.removeChild(anchor);

			URL.revokeObjectURL(url);
		} catch (err) {
			toast.error(`Can't download file ${filename}`);
		}
	};
</script>

{#if type === 'LINK'}
	<div class="flex flex-col items-center mt-[50vh]">
		<div class="spinner">
			<svg
				role="status"
				class="w-12 h-12 md:w-8 md:h-8 mr-1 text-gray-200 animate-spin dark:text-gray-600 fill-gray-900"
				viewBox="0 0 100 101"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
					fill="currentColor"
				/>
				<path
					d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
					fill="currentFill"
				/>
			</svg>
		</div>

		<h3 class="italic text-lg md:text-base">Redirecting to <span>{redirect_to}</span></h3>
	</div>
{:else if type === 'FILE'}
	<div class="mt-[40vh] sm:mx-auto sm:w-full sm:max-w-xl">
		<h1 class="text-2xl tracking-tight text-gray-900 md:text-4xl text-center">
			<span class="block xl:inline">Your File</span>
		</h1>

		<h6 class="text-lg tracking-tight text-gray-900 md:text-xl mt-3 text-center">
			<span class="block xl:inline">{filename}</span>
		</h6>

		<div class="mt-8 text-center">
			<button
				class="cursor-pointer text-white bg-gray-900 hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
				on:click={downloadFile}
			>
				Download File
			</button>
		</div>
	</div>
{/if}
