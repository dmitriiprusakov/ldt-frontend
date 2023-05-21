import Link from "next/link";
import React, { FC, PropsWithChildren } from "react";

import css from "./index.module.css";

const Header: FC<PropsWithChildren> = ({ children }: PropsWithChildren) => {
	return (
		<header className={css.header}>
			<div className={css.content}>
				<Link href="/">
					<h1>Logo</h1>
				</Link>
				{children}
			</div>
		</header>
	);
};

export default Header;
