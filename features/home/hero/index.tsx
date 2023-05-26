import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

import nextSvg from "public/next.svg";

import css from "./index.module.css";
import clsx from "clsx";

const Hero: FC = () => {
	return (
		<section>
			<div className={css.content}>
				<div className={css.text}>
					<h1>
						Провести мероприятие в Москве легко
					</h1>
					<div className={css.links}>
						<Link
							href="/new-event"
							className={clsx(css.link, css.primary)}
						>
							Создать мероприятие
						</Link>
						<Link
							href="/new-service"
							className={css.link}
						>
							Разместить услуги
						</Link>
					</div>
				</div>
				<Image src={nextSvg} alt="image" />
			</div>
		</section>
	);
};

export default Hero;
