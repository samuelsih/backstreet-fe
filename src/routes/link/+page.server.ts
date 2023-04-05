import { LinkSchema } from '$lib/types/schema';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { SECRET_API_INSERT_LINK } from '$env/static/private';
import type { ILinkInsertResponse } from '$lib/types/interfaces';
import axios from 'axios';

export const load = (async (event) => {
	const form = await superValidate(event, LinkSchema);

	return { form };
}) satisfies PageServerLoad;

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, LinkSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		const body = {
			alias: form.data.alias,
			redirect_to: form.data.redirect_to,
			type: 'LINK'
		};

		try {
			await axios.post<ILinkInsertResponse>(SECRET_API_INSERT_LINK, body)
		} catch (error: unknown) {
			if(axios.isAxiosError(error)) {
				const { message } = error.response?.data || "Can't process your request right now."
				return setError(form, null, message)
			}
			
			return setError(form, null, "Internal server error.")
		}

		throw redirect(303, `/claim/${form.data.alias}`);
	}
} satisfies Actions;