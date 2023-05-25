/* eslint-disable @typescript-eslint/no-explicit-any */

export type JsonRpcBody<T> = {
	result?: T,
	error?: {
		code: number,
		message: string,
	}
}

export type User = {
	id: string,
	created_at: string,
	updated_at: string,
	fio: string,
	email: string,
	password_hash: string,
	avatar_url: string,
	admin: [],
	vendor_id: [],
	position: []
}

export type SearchItem = {
	id: number,
	title: string,
	description: string,
	address: string,
	phone: string,
	photo: string,
	created_at: string,
	updated_at: string,
	main: any[],
	rules: any[],
	equipment: any[],
}

export type SearchResult = {
	next_page_key: number,
	total: number,
	props: string[],
	items: SearchItem[]
}

export type Vendor = {
	id: number,
	title: string,
	type: string,
	created_at: string,
	updated_at: string,
}

export type VendorResult = {
	next_page_key: number,
	items: Vendor[],
}
