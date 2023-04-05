import type { GetResponse } from "./common";

export interface DefaultResponse {
	code: number;
	message: string;
}

export interface ILinkInsertRequest {
	alias?: string;
	redirect_to?: string;
}

export interface ILinkInsertResponse extends DefaultResponse {
	alias: string;
	redirect_to: string;
	type: string;
}

export interface FindSlugResponse extends DefaultResponse {
	response: GetResponse;
}