type FetcherParams = {
	method: string
}
const fetcher = async (args) => {
	const [url, params] = args;

	console.log(params.method)
	const res = await fetch(
		'https://events.lct23.dev.40ants.com/',
		{
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: 0,
				jsonrpc: "2.0",
				method: params.method,
				params: { page_key: 0, limit: 10 }
			})
		}
	);

	return res.json();
}

export { fetcher }
