import { SECRET_API_DOWNLOAD_FILE } from "$env/static/private";

export const fetchBlob = async (alias: string): Promise<Blob> => {
	try {
		const urlToDownload = `${SECRET_API_DOWNLOAD_FILE}/${alias}`;
		const file = await fetch(urlToDownload);

		const blob = await file.blob();

		return blob;
	} catch (error) {
		throw new Error('Cant download file');
	}
};
