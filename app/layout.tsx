import "styles/globals.css";
import "styles/nprogress.css";

import { PropsWithChildren } from "react";

import { CeraProRegular } from "core/fonts";

import css from "./index.module.css";

export const metadata = {
	title: "EventLoop",
	description: "Сервис для создания мероприятий",
};

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en" className={CeraProRegular.className}>
			<body>
				<section className={css.layout}>
					{children}
				</section>
			</body>
		</html>
	);
}
