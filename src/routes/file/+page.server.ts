import { FileSchema } from '$lib/types/schema';
import { fail, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	file: async ({ request }) => {
		const formData = await request.formData();
		const alias = formData.get('alias')?.toString();
		const file = formData.get('file');

		const parsed = FileSchema.safeParse({ alias, file });
		if (!parsed.success) {
			const { alias, file } = parsed.error.flatten().fieldErrors;

			return fail(400, {
				errType: 'form',
				aliasErr: alias,
				fileErr: file
			});
		}
	}
};
