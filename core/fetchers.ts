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

const ratingFetcher = axios.create({
	baseURL: "https://rating.lct23.dev.40ants.com",
	headers: {
		"Content-Type": "application/json",
	},
	transformRequest: transformRequest,
	transformResponse: transformResponse,
});

const imagesFetcher = axios.create({
	baseURL: "https://images.lct23.dev.40ants.com/upload",
	headers: {
		"Content-Type": "multipart/form-data",
	},
});

export { passportFetcher, eventsFetcher, ratingFetcher, imagesFetcher };
