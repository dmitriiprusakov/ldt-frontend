import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

import css from "./index.module.css";
import clsx from "clsx";

const Hero: FC = () => {
	return (
		<section>
			<div className={css.content}>
				<div className={css.text}>
					<h1>
						Организуйте
						идеальное мероприятие
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
							Добавить свои услуги
						</Link>
					</div>
				</div>
				<Image
					width={450}
					height={380}
					src={"/HeroImage.png"}
					alt="Красивые малиновые буквы O O P"
				/>
			</div>
		</section>
	);
};

export default Hero;
