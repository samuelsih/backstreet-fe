import { validateFile } from '$lib/server';
import { FileSchema } from '$lib/types/schema';
import { fail, type Actions } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	const form = await superValidate(event, FileSchema);

	return { form };
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, FileSchema);

		if (!form.valid) return fail(400, { form });

		const file = formData.get('file');

		const hasFileValidationErr = validateFile(file);

		if (hasFileValidationErr) return setError(form, 'file', hasFileValidationErr.message);
	}
};
