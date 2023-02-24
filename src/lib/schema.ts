import { z } from 'zod';

const maxFileSize = 1024 * 10; //10MB
const alphaNumericRegex = new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]+$');

export const LinkSchema = z.object({
	alias: z
		.string({ required_error: 'Alias is required' })
		.regex(alphaNumericRegex, { message: 'Can only contain alphanumeric' })
		.min(5, { message: 'Minimum 5 characters' })
		.max(30, { message: 'Maximum 30 characters' })
		.trim(),
	redirect_to: z
		.string({ required_error: 'URL is required' })
		.url({ message: 'Please input valid url' })
		.trim(),
	type: z.never()
});

export const FileSchema = z.object({
	alias: z
		.string({ required_error: 'Alias is required' })
		.regex(alphaNumericRegex, { message: 'Can only contain alphanumeric' })
		.min(5, { message: 'Minimum 5 characters' })
		.max(30, { message: 'Maximum 30 characters' })
		.trim(),
	file: z
		.instanceof(Blob)
		.refine((file) => file.size > 0, {
			message: 'File is required'
		})
		.refine((file) => Math.round(file.size / 1024) <= maxFileSize, {
			message: 'Maximum file size is 10MB'
		}),
	type: z.never()
});
