import { SECRET_API_GET_DATA, SECRET_API_INSERT_LINK } from '$env/static/private';
import type { DefaultResponse, ILinkInsertRequest, ILinkInsertResponse } from '$lib/types/interfaces';
import axios from 'axios';

export const getLink = async (slug: string): Promise<ILinkInsertResponse> => {
	try {
		const response = await axios.get<ILinkInsertResponse>(`${SECRET_API_GET_DATA}/${slug}`);
		return response.data;
	} catch (err) {
		if (axios.isAxiosError(err)) {
			throw new Error(err.message);
		}

		throw new Error('Something wrong');
	}
};

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