import axios from "axios";

const fetcher = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_URL || ""}`,
	headers: {
		"Content-Type": "application/json",
	},
});

const eventsFetcher = axios.create({
	baseURL: "https://events.lct23.dev.40ants.com",
	headers: {
		"Content-Type": "application/json",
	},
});

export { fetcher, eventsFetcher };
