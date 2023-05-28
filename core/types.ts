/* eslint-disable @typescript-eslint/no-explicit-any */

export type Statistic = {
	events_count: number;
	users_count: number;
	services_count: number;
}

export type JsonRpcBody<T> = {
	result?: T;
	error?: {
		code: number;
		message: string;
	}
}

export type User = {
	id: string;
	created_at: string;
	updated_at: string;
	fio: string;
	email: string;
	password_hash: string;
	avatar_url: string;
	admin: [];
	vendor_id: [];
	position: []
}

export type MainCharasteristic = {
	id: number;
	prop_id: number;
	service_id: number;
	created_at: string;
	updated_at: string;
	title: string;
	type: string;
	value_type: string;
	units: string;
	attributes: {
		value: number;
	}
}

export type Equipment = {
	id: number;
	prop_id: number;
	service_id: number;
	created_at: string;
	updated_at: string;
	title: string;
	type: string;
	value_type: string;
	units: [];
	attributes: {
		available: boolean;
	}
}

export type SearchItemShort = Pick<SearchItem, "id" | "type" | "title" | "photo" | "price">

export type SearchItem = {
	id: number;
	title: string;
	type: string;
	description: string;
	address: string;
	phone: string;
	photo: string;
	price: number;
	created_at: string;
	updated_at: string;
	main: MainCharasteristic[];
	equipment: Equipment[];
	rules: any[];
}

export type SearchResult = {
	next_page_key: number;
	total: number;
	props: string[];
	items: SearchItem[];
}

export type ServiceSearchItemShort = Pick<
	ServiceSearchItem,
	"id" | "type" | "title" | "images" | "min_price" | "max_price"
>

export type ServiceSearchItem = {
	id: number;
	created_at: string;
	updated_at: string;
	type: string;
	title: string;
	images: string[];
	min_price: number;
	max_price: number;
}

export type ServicesSearchResult = {
	next_page_key: number;
	items: ServiceSearchItem[];
}

export type Vendor = {
	id: number;
	title: string;
	type: string;
	created_at: string;
	updated_at: string;
}

export type VendorResult = {
	next_page_key: number;
	items: Vendor[];
}

export type BookRange = {
	from_ts: number;
	to_ts: number;
}

export type Place = {
	id: number;
	vendor_id: number;
	created_at: string;
	updated_at: string;
	title: string;
	description: string;
	address: string;
	phone: string;
	photo: string;
	rating: number;
	public: boolean;
	main: MainCharasteristic[];
	equipment: Equipment[];
	rules: [];
}

export type PlaceResult = {
	place: Place;
	booking: BookRange[];
}
export type Checkpoint = {
	title: string;
	active: boolean;
	type?: string;
}
export type Checklist = {
	title: string;
	planning: Checkpoint[];
	recommendations: Checkpoint[];
	design: Checkpoint[];
}

export type Checklists = Record<string, Checklist>

export type Comment = {
	id: number;
	user_id: number;
	object_id: number;
	created_at: string;
	updated_at: string;
	object_type: string;
	text: string;
	rating: number;
	user: User;
}

export type CommentsResult = {
	items: Comment[] | null;
}

export type PlaceFilters = {
	search?: string;
	type?: string;
	area?: string;
	capacity?: string;
	chairs?: boolean;
	tables?: boolean;
	timeRange?: [string, string];
}

export type EventsResult = {
	next_page_key: number;
	items: Event[];
}

export type Event = {
	created_at: string,
	updated_at: string,
	author_id: number,
	id: number,
	title: string,
	items: (SearchItem | ServiceSearchItem)[]
} 
