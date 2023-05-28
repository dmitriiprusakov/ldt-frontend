import { Footer, Header, Main } from "core/layouts";
import { Hero, Builder } from "features/new-event";

export default function NewServicePage() {
	return (
		<>
			<Header />
			<Main>
				<Hero />
				<Builder />
			</Main>
			<Footer />
		</>
	);
}
