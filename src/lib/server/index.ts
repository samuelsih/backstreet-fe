import { SECRET_API_GET_DATA, SECRET_API_INSERT_LINK } from '$env/static/private';
import type { DefaultResponse, FindSlugResponse, ILinkInsertRequest } from '$lib/types/interfaces';
import axios from 'axios';

const maxFileSize = 1024 * 10; //10MB

export const insertLink = async (link: ILinkInsertRequest): Promise<DefaultResponse> => {
	try {
		const response = await axios.post<DefaultResponse>(
			SECRET_API_INSERT_LINK,
			link,
			{
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				}
			}
		);

		return response.data;
	} catch (err) {
		if (axios.isAxiosError(err)) {
			throw new Error(err.message);
		}

		throw new Error('Something wrong');
	}
};

export const getDataBySlug = async (slug: string): Promise<FindSlugResponse> => {
	try {
		const response = await axios.get<FindSlugResponse>(`${SECRET_API_GET_DATA}/${slug}`);
		return response.data;
	} catch (err) {
		if (axios.isAxiosError(err)) {
			throw new Error(err.message);
		}

		throw new Error('Something wrong');
	}
};

export const validateFile = (file: FormDataEntryValue | null): Error | null => {
	if (!(file instanceof File)) {
		return new Error('Not a file');
	}

	if (file.size <= 0) {
		return new Error('File is required');
	}

	if (Math.round(file.size / 1024) > maxFileSize) {
		return new Error(
			`Maximum file size is 10MB, got ${file.size} [${file.size / 1024} - ${maxFileSize}]`
		);
	}

	return null;
};