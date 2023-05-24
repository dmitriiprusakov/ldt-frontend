import { Footer, Header, Main } from "core/layouts";
import { Hero, Searcher } from "features/search";

export default function SeacrhPage() {
	return (
		<>
			<Header />
			<Main>
				<Hero />
				<Searcher />
			</Main>
			<Footer>
				content Search
			</Footer>
		</>
	);
}
