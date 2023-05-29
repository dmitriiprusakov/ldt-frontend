import { AuthProvider } from "core/auth";
import { LogoSvg } from "core/icons";
import Link from "next/link";
import React, { FC } from "react";
import { Profile } from "./components";

import css from "./index.module.css";

const Header: FC = () => {
	return (
		<header className={css.header}>
			<nav className={css.content}>
				<Link href="/" className={css.logoLink}>
					{LogoSvg()}
				</Link>
				<ul className={css.links}>
					<li>
						<Link href="/new-service">
							Добавить свои услуги
						</Link>
					</li>
					<li>
						<Link href="/new-event">
							Мероприятия
						</Link>
					</li>
					<li>
						<Link href="/search">
							Услуги и площадки
						</Link>
					</li>
					<li>
						<AuthProvider>
							<Profile />
						</AuthProvider>
					</li>
				</ul>

			</nav>
		</header>
	);
};

export default Header;
