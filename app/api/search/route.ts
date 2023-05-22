import { NextResponse } from "next/server";

export async function GET() {
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

	console.warn("CHECK");

	const data = await res.json();

	return NextResponse.json({ data });
}
