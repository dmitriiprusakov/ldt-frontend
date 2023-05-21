import Link from "next/link";
import React, { FC, PropsWithChildren } from "react";

import css from "./index.module.css";

const Footer: FC<PropsWithChildren> = ({ children }: PropsWithChildren) => {
	return (
		<footer className={css.footer}>
			<div className={css.content}>
				<Link href="/">
					Go back
				</Link>
				{children}
			</div>
		</footer>
	);
};

export default Footer;
