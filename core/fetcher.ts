/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const transformRequest = (data: any) => {
	const { method, ...params } = data;

	return JSON.stringify({
		id: 0,
		jsonrpc: "2.0",
		method: method,
		params: params,
	});
};

const transformResponse = (data: string) => {
	const { result, error } = JSON.parse(data);

	return { result, error };
};

const fetcher = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_URL || ""}`,
	headers: {
		"Content-Type": "application/json",
	},
});

const passportFetcher = axios.create({
	baseURL: "https://passport.lct23.dev.40ants.com",
	headers: {
		"Content-Type": "application/json",
	},
	transformRequest: transformRequest,
	transformResponse: transformResponse,
});

const eventsFetcher = axios.create({
	baseURL: "https://events.lct23.dev.40ants.com",
	headers: {
		"Content-Type": "application/json",
	},
	transformRequest: transformRequest,
	transformResponse: transformResponse,
});

export { fetcher, passportFetcher, eventsFetcher };
