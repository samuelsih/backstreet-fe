import { insertLink } from '$lib/server';
import {  fail, redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	link: async ({ request }) => {
		const formData = await request.formData();
		const formAlias = formData.get('alias')?.toString();
		const formRedirect = formData.get('redirect_to')?.toString();

		try {
			const { code, message } = await insertLink({
				alias: formAlias,
				redirect_to: formRedirect
			});
	
			if (code >= 400) {
				return fail(code, {
					data: message.includes('ECONNREFUSED') ? 'Something Wrong' : message
				});
			}
		} catch(err) {
			return fail(500, {
				errorMsg: `Something Wrong`
			})
		}

		throw redirect(303, `/claim/${formAlias}`);
	}
};
