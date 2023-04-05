import { SECRET_API_INSERT_FILE } from '$env/static/private';
import { validateFile } from '$lib/server';
import type { IFileInsertResponse } from '$lib/types/interfaces';
import { FileSchema } from '$lib/types/schema';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import axios from 'axios';
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
		if (!form.valid) {
			return fail(400, { form });
		}

		const file = formData.get('file');

		const hasFileValidationErr = validateFile(file);

		if (hasFileValidationErr) {
			return setError(form, 'file', hasFileValidationErr.message);
		}

		if (file === null) {
			return setError(form, 'file', 'Expected file to be upload');
		}

		const jsonField = {
			alias: form.data.alias,
			type: 'FILE'
		};

		const formUpload = new FormData();
		formUpload.append('json_field', JSON.stringify(jsonField));
		formUpload.append('file_field', file);

		try {
			await axios.post<IFileInsertResponse>(`${SECRET_API_INSERT_FILE}`, formUpload, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				const { message } = error.response?.data || "Can't process your request right now.";
				return setError(form, null, message);
			}

			return setError(form, null, 'Internal server error.');
		}

		throw redirect(303, `/claim/${form.data.alias}`);
	}
};
