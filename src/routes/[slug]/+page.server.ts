import { getLink } from '$lib/server';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	if(params.slug === "") {
		throw redirect(303, '/')
	}

	const { code, message, response } = await getLink(params.slug);

	if (code >= 400) {
		if (code >= 500 && message.includes('ECONNREFUSED')) {
			throw error(code, 'Unexpected Error');
		}

		throw error(code, message);
	}

	return {
		response
	}
}) satisfies PageServerLoad;
