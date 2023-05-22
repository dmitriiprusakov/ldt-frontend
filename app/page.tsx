import { Footer, Header, Main } from "core/layouts";
import { Hero } from "features/home";

// import css from "./index.module.css";

export default function RootPage() {
	return (
		<>
			<Header />
			<Main >
				<Hero />
			</Main>
			<Footer>
				index
			</Footer>
		</>
	);
}
