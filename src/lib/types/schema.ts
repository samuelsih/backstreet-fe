import { z } from 'zod';

const maxFileSize = 1024 * 10; //10MB
const alphaNumericRegex = new RegExp('^[a-z0-9]+$');

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
		.trim()
});

export const FileSchema = z.object({
	alias: z
		.string({ required_error: 'Alias is required' })
		.regex(alphaNumericRegex, { message: 'Can only contain alphanumeric' })
		.min(5, { message: 'Minimum 5 characters' })
		.max(30, { message: 'Maximum 30 characters' })
		.trim(),
	file: z.instanceof(Blob).superRefine((file, ctx) => {
		if (!(file instanceof Blob)) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Bad file input'
			});
		}

		if (file.size <= 0) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'File is required'
			});
		}

		if (Math.round(file.size / 1024) > maxFileSize) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: `Maximum file size is 10MB, got ${file.size} [${
					file.size / 1024
				} - ${maxFileSize}]`
			});
		}
	})
});

export const AliasChildSchema = z
	.string({ required_error: 'Alias is required' })
	.regex(alphaNumericRegex, { message: 'Can only contain alphanumeric' })
	.min(5, { message: 'Minimum 5 characters' })
	.max(30, { message: 'Maximum 30 characters' })
	.trim();

export type LinkClaim = {
	alias: string;
	redirect_to: string;
};

export type FileClaim = {
	alias: string;
	filename: string;
};
