import { Footer, Header, Main } from "core/layouts";
import { Hero, Builder } from "features/new-service";

export default function NewServicePage() {
	return (
		<>
			<Header />
			<Main>
				<Hero />
				<Builder />
			</Main>
			<Footer>
				content profile
			</Footer>
		</>
	);
}
