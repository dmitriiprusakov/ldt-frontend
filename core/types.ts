export type JsonRpcBody<T> = {
	id: number,
	jsonrpc: string,
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
