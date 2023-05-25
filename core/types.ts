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

export type MainCharasteristic = {
	id: number,
	prop_id: number,
	service_id: number,
	created_at: string,
	updated_at: string,
	title: string,
	type: string,
	value_type: string,
	units: string,
	attributes: {
		value: number,
	}
}

export type Equipment = {
	id: number,
	prop_id: number,
	service_id: number,
	created_at: string,
	updated_at: string,
	title: string,
	type: string,
	value_type: string,
	units: [],
	attributes: {
		available: boolean,
	}
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
	main: MainCharasteristic[],
	equipment: Equipment[],
	rules: any[],
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

export type BookRange = {
	from_ts: number,
	to_ts: number,
}

export type Place = {
	id: number,
	created_at: string,
	updated_at: string,
	title: string,
	description: string,
	address: string,
	phone: string,
	photo: string,
	vendor_id: number,
	public: boolean,
	main: MainCharasteristic[],
	equipment: Equipment[],
	rules: []
}

export type PlaceResult = {
	place: Place
	booking: BookRange[],
}
