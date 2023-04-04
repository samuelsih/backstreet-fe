import { SECRET_API_GET_DATA } from '$env/static/private';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import axios from 'axios';
import type { FindSlugResponse } from '$lib/types/interfaces';

export const load = (async ({ params }) => {
	if (params.slug === '') {
		throw redirect(303, '/');
	}

	let response: FindSlugResponse

	try {
		const fetched = await axios.get<FindSlugResponse>(`${SECRET_API_GET_DATA}/${params.slug}`)
		response = fetched.data
	} catch (err: unknown) {
		if(axios.isAxiosError(err)) {
			const { code, message } = err.response?.data || `Can't find ${params.slug} right now.`
			throw error(code, message)
		}

		throw error(500, "Internal server error.")
	}

	return {
		response
	};
}) satisfies PageServerLoad;
