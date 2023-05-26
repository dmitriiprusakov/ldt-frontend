import { Footer, Header, Main } from "core/layouts";
import { Hero, Checklists } from "features/new-event";

export default function NewServicePage() {
	return (
		<>
			<Header />
			<Main>
				<Hero />
				<Checklists />
			</Main>
			<Footer>
				content profile
			</Footer>
		</>
	);
}
