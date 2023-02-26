import { redirect, type Actions, fail } from '@sveltejs/kit';
import { validateLinkInput, validateFileInput } from '$lib/validation';
import { insertLink } from '$lib/server';


export const actions: Actions = {
	link: async ({ request }) => {
		const formData = await request.formData();
		const formAlias = formData.get('alias')?.toString() ?? ''
		const formRedirect = formData.get('redirect_to')?.toString() ?? ''

		const { hasError, ...err } = validateLinkInput(formData);
		if (hasError) {
			return fail(400, {
				data: getFirstErr(err),

			})
		}

		const { code, message, alias } = await insertLink({
			alias: formAlias,
			redirect_to: formRedirect
		});

		if (code >= 400) {
			return fail(code, {
				data: message.includes('ECONNREFUSED') ? "Unexpected Error" : message,
			})
		}

		throw redirect(303, `/claim/${alias}`);
	},

	file: async ({ request }) => {
		// const blob = await request.blob();
		// const rawForm = await request.formData();

		// const formData = new FormData()
		// formData.append('alias', rawForm.get('alias') ?? '');
		// formData.append('file', blob)

		const data = await request.formData();

		const { hasError, ...err } = validateFileInput(data);
		if (hasError) {
			console.log(err);
			return {
				code: 400,
				error: err
			};
		}
	}
};

const getFirstErr = (obj: object): string => {
	for (const [, value] of Object.entries(obj)) {
		if(value) {
			return value
		}
	}

	return ""
}