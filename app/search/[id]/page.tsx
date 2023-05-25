import { Footer, Header, Main } from "core/layouts";
import { FullInfo } from "features/search";

export default function SearchItemPage(
	{ params }: { params: { id: string } }
) {
	return (
		<>
			<Header />
			<Main>
				<FullInfo id={params.id} />
			</Main>
			<Footer>
				content Search
			</Footer>
		</>
	);
}
