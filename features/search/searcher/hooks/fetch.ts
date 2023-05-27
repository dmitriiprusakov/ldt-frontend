import { useEffect, useState } from "react";
import axios from "axios";
import { eventsFetcher } from "core/fetchers";
import { JsonRpcBody } from "core/types";

type Props = {
	method: string,
	parameters: Record<string, any>
}
export default function useFetch<T>({ method, parameters }: Props) {
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);

				const response = await eventsFetcher.post<JsonRpcBody<any>>(
					"/",
					{
						method: method,
						...parameters,
					}
				);

				console.log(response);

				// setData(response.data);
			} catch (err) {
				setError(true);
			} finally {
				setLoading(false);
			}
		};

		void fetchData();
	}, [method, parameters]);

	return { data, error, loading };
}
