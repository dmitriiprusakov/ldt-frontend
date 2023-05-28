import { Footer, Header, Main } from "core/layouts";
import { Hero } from "features/home";

export default function RootPage() {
	return (
		<>
			<Header />
			<Main >
				<Hero />
			</Main>
			<Footer />
		</>
	);
}
