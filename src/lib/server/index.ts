import { SECRET_API_GET_DATA, SECRET_API_INSERT_LINK } from '$env/static/private';
import axios from 'axios';

type PostLinkResponse = {
	code: number;
	message: string;
	alias: string;
	redirect_to: string;
	type: string;
};

type GetResponse = {
	code: number;
	message: string;
	response: {
		alias: string;
		redirect_to: string;
		type: string;
		filename: string;
	};
};

export const getLink = async (slug: string): Promise<GetResponse> => {
	try {
		const { data } = await axios.get<GetResponse>(`${SECRET_API_GET_DATA}/${slug}`);
		console.log("ini data: ", data);
		return {
			code: data.code,
			message: data.message,
			response: data.response
		};
	} catch (err) {
		console.error("ini error: ", err);
		if (axios.isAxiosError(err)) {
			return {
				code: parseInt(err.response?.data?.code, 10) || 500,
				message: err.message || 'Something wrong',
				response: {
					alias: '',
					redirect_to: '',
					type: '',
					filename: ''
				}
			};
		}

		return {
			code: 500,
			message: 'Something wrong',
			response: {
				alias: '',
				redirect_to: '',
				type: '',
				filename: ''
			}
		};
	}
};

export const insertLink = async ({
	alias,
	redirect_to
}: {
	alias: string;
	redirect_to: string;
}): Promise<PostLinkResponse> => {
	try {
		const { data } = await axios.post<PostLinkResponse>(
			SECRET_API_INSERT_LINK,
			{
				alias: alias,
				redirect_to: redirect_to,
				type: 'LINK'
			},
			{
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				}
			}
		);

		return data;
	} catch (err) {
		if (axios.isAxiosError(err)) {
			return {
				code: parseInt(err.response?.data?.code, 10) || 500,
				message: err.message || 'Something wrong',
				alias: '',
				redirect_to: '',
				type: ''
			};
		}

        console.log(err);
        return {
            code: 500,
            message: 'Something wrong',
            alias: '',
            redirect_to: '',
            type: ''
        }
	}
};
