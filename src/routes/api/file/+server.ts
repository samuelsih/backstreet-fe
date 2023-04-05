import { SECRET_API_DOWNLOAD_FILE } from '$env/static/private';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const alias = url.searchParams.get('alias');
	if (!alias) {
		throw error(404, 'Unknown data');
	}

	try {
		const urlToDownload = `${SECRET_API_DOWNLOAD_FILE}/${alias}`;
		const file = await fetch(urlToDownload);

		const blob = await file.blob();
		return new Response(blob);
	} catch (err) {
		throw error(500, 'Cant download file');
	}
};
