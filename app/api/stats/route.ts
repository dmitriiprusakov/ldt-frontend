import { NextResponse } from "next/server";

export async function GET() {
	const res = await fetch("https://events.lct23.dev.40ants.com", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			id: 0,
			jsonrpc: "2.0",
			method: "get_stats",
			params: {},
		}),
	});

	if (!res.ok) {
		return;
	}

	const data = await res.json();

	return NextResponse.json(data);
}

export const revalidate = 60;
