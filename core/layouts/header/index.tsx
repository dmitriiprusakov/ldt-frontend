import { AuthProvider } from "core/auth";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { Profile } from "./components";

import css from "./index.module.css";

const Header: FC = () => {
	return (
		<header className={css.header}>
			<nav className={css.content}>
				<Link href="/" className={css.logoLink}>
					<Image
						src={"/Logo.png"}
						width={90}
						height={70}
						aria-hidden="true"
						alt="EventLoop"
					/>
				</Link>
				<ul className={css.links}>
					<li>
						<Link href="/new-service">
							Добавить услуги
						</Link>
					</li>
					<li>
						<Link href="/new-event">
							Создать мероприятие
						</Link>
					</li>
					<li>
						<Link href="/search">
							Поиск услуг
						</Link>
					</li>
					<li>
						<AuthProvider>
							<Profile />
						</AuthProvider>
					</li>
				</ul>
				<div className={css.burgerButton}>
					<input type="checkbox" id="burgerTrigger" />
					<label htmlFor="burgerTrigger">
						<div />
					</label>
					<menu className={css.burgerMenu}>
						<ul className={css.burgerLinks}>
							<li>
								<Link href="/new-service">
									Добавить услуги
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
					</menu>
				</div>

			</nav>
		</header>
	);
};

export default Header;
