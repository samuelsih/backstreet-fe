import type { Actions } from "@sveltejs/kit";
import { validateLinkInput, validateFileInput } from "$lib/validation";

export const actions: Actions = {
	link : async ({ request }) => {
		const formData = await request.formData();
		const { hasError, ...err } = validateLinkInput(formData);
		if(hasError) {
			console.log(err);
			return {
				code: 400,
				error: err,
			}
		}
	},

	file: async ({ request }) => {
		// const blob = await request.blob();
		// const rawForm = await request.formData();

		// const formData = new FormData()
		// formData.append('alias', rawForm.get('alias') ?? '');
		// formData.append('file', blob)

		const data = await request.formData();

		const { hasError, ...err } = validateFileInput(data);
		if(hasError) {
			console.log(err);
			return {
				code: 400,
				error: err,
			}
		}
	}
}