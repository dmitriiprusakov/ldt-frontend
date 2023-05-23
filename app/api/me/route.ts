
import { JsonRpcBody, User } from "core/types";
import { NextRequest, NextResponse } from "next/server";

type MeRequestBody = {
	token: string,
}

export async function POST(request: NextRequest) {
	try {
		const body: MeRequestBody = await request.json();

		console.log("me body=", body);

		const user = await fetch(
			"https://passport.lct23.dev.40ants.com",
			{
				method: "POST",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json",
					"Authorization": body.token,
				},
				body: JSON.stringify({
					id: 0,
					jsonrpc: "2.0",
					method: "my_profile",
				}),
			}
		);

		const data: JsonRpcBody<User> = await user.json();

		if (!data || !data.result || data.error) return NextResponse.json(null);

		return NextResponse.json(data.result);
	} catch (error) {
		console.log("me error=", error);

		return NextResponse.json(null);
	}
}
