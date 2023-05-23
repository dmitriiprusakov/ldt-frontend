
import { JsonRpcBody } from "core/types";
import { NextRequest, NextResponse } from "next/server";

type SignUpRequestBody = {
	fio: string,
	email: string,
	password: string,
}

export async function POST(request: NextRequest) {
	const body: SignUpRequestBody = await request.json();

	console.log("signup body=", body);

	const user = await fetch(
		"https://passport.lct23.dev.40ants.com",
		{
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: 0,
				jsonrpc: "2.0",
				method: "signup",
				params: {
					fio: body.fio,
					email: body.email,
					password: body.password,
				},
			}),
		}
	);

	const data: JsonRpcBody<string> = await user.json();

	if (!data || !data.result || data.error) return NextResponse.json(null);

	return NextResponse.json(data.result);
}
