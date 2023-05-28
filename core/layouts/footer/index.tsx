import Link from "next/link";
import React, { FC } from "react";

import css from "./index.module.css";

const Footer: FC = () => {
	return (
		<footer className={css.footer}>
			<div className={css.content}>
				<ul className={css.links}>
					<li>
						<Link href="/">
							EventLoop
						</Link>
					</li>
					<li>
						<Link href="https://createdin.moscow/">
							АКИ
						</Link>
					</li>
				</ul>
				<ul className={css.links}>
					<li>
						<Link href="/">
							Правила
						</Link>
					</li>
					<li>
						<Link href="/">
							FAQ
						</Link>
					</li>
					<li>
						<Link href="/">
							Арендодателям
						</Link>
					</li>
				</ul>
			</div>
		</footer>
	);
};

export default Footer;
