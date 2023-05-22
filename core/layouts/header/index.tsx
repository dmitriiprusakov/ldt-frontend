import Link from "next/link";
import React, { FC, PropsWithChildren } from "react";

import css from "./index.module.css";

const Header: FC<PropsWithChildren> = ({ children }: PropsWithChildren) => {
	return (
		<header className={css.header}>
			<nav className={css.content}>
				<Link href="/">
					Logo
				</Link>
				<ul className={css.links}>
					<li>
						<Link href="/search">
							Услуги
						</Link>
					</li>
				</ul>

				{children}
			</nav>
		</header>
	);
};

export default Header;
