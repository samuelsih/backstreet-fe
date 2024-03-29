import { z } from 'zod';

// const _alphaNumericRegex = new RegExp('^[a-z0-9]+$');

export const LinkSchema = z.object({
	alias: z
		.string({ required_error: 'Alias is required' })
		.min(5, { message: 'Minimum 5 characters' })
		.max(30, { message: 'Maximum 30 characters' })
		.trim(),
	redirect_to: z
		.string({ required_error: 'URL is required' })
		.url({ message: 'Please input valid url' })
		.trim()
});

export const FileSchema = z.object({
	alias: z
		.string({ required_error: 'Alias is required' })
		.min(5, { message: 'Minimum 5 characters' })
		.max(30, { message: 'Maximum 30 characters' })
		.trim(),

	file: z.custom<File>()
});

export const DownloadFileSchema = z.object({
	alias: z
		.string({ required_error: 'Alias is required' })
		.min(5, { message: 'Minimum 5 characters' })
		.max(30, { message: 'Maximum 30 characters' })
		.trim()
});
