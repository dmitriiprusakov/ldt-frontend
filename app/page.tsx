import { Footer, Header, Main } from "core/layouts";
import { JsonRpcBody, Statistic } from "core/types";
import { Hero, Stats } from "features/home";

async function getData() {
	if (!process.env.NEXT_PUBLIC_URL) return;

	const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/stats`);

	if (!res.ok) {
		return;
	}

	return res.json() as Promise<JsonRpcBody<Statistic>>;
}

export default function RootPage() {
	// const data = await getData();

	return (
		<>
			<Header />
			<Main >
				<Hero />
				{/* {data?.result && <Stats data={data.result} />} */}
			</Main>
			<Footer />
		</>
	);
}
