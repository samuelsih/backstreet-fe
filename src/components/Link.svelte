<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
	<div class="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
		<form class="mb-0 space-y-6" method="POST" action="?/link">
			<div>
				<label for="redirect_to" class="block text-sm font-medium text-gray-700">URL</label>
				<div class="mt-1">
					<input
						id="redirect_to"
						name="redirect_to"
						type="text"
						class="w-full border-gray-900 rounded-lg shadow-sm"
						placeholder="Enter your URL here"
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
					/>
				</div>
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