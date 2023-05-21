import { Footer, Header, Main } from "core/layouts";

import css from "./index.module.css";

async function getData() {
	const res = await fetch(
		"https://events.lct23.dev.40ants.com/",
		{
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: 0,
				jsonrpc: "2.0",
				method: "search_places",
				params: { page_key: 0, limit: 10 },
			}),
		}
	);

	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}

	return res.json();
}

export default function Page() {
	return (
		<>
			<Header>
				index
			</Header>
			<Main >
				<h1>EventLoop index</h1>
			</Main>
			<Footer>
				index
			</Footer>
		</>
	);
}
