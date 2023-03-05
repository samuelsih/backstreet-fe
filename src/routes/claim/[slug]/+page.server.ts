import { getDataBySlug } from '$lib/server';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const { code, message, response } = await getDataBySlug(params.slug);

	if (code >= 400) {
		if (code >= 500 && message.includes('ECONNREFUSED')) {
			throw error(code, 'Unexpected Error');
		}

		throw error(code, message);
	}

	const { alias } = response;

	return {
		alias
	};
}) satisfies PageServerLoad;
