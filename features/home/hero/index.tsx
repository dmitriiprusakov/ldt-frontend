import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

import Spot1Pic from "public/Spot1.png";
import Spot2Pic from "public/Spot2.png";

import css from "./index.module.css";
import clsx from "clsx";

const Hero: FC = () => {
	return (
		<section className={css.section}>
			<div className={css.content}>
				<div className={css.text}>
					<h1>
						Организуйте<br />
						идеальное<br />
						мероприятие
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
					aria-hidden="true"
					alt="Красивые малиновые буквы O O P"
				/>
			</div>
			<Image
				className={css.spot1}
				src={Spot1Pic}
				aria-hidden="true"
				alt="Красивые цветные пятна с оттенком розового"
			/>
			<Image
				className={css.spot2}
				src={Spot2Pic}
				aria-hidden="true"
				alt="Красивые цветные пятна с оттенком розового"
			/>
		</section>
	);
};

export default Hero;
