import { getLink } from '$lib/server';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const { code, message, response } = await getLink(params.slug);

	if (code >= 400) {
		if (code >= 500 && message.includes('ECONNREFUSED')) {
			throw error(code, 'Unexpected Error');
		}

		if(!["LINK", "FILE"].includes(response.type)) {
			throw error(400, "Bad Request");
		}

		throw error(code, message);
	}

	const { alias } = response;

	return {
		alias
	};
}) satisfies PageServerLoad;
