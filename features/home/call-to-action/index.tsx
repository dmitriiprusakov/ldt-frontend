import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

import css from "./index.module.css";
import clsx from "clsx";

const Cta: FC = () => {
	return (
		<section className={css.section}>
			<div className={css.content}>
				<div className={css.text}>
					<h1>
						Организуй сейчас —<br />
						проведи завтра
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
				<Image
					width={203}
					height={473}
					src={"/CtaRounds.png"}
					loading="lazy"
					aria-hidden="true"
					alt="Картинка с кружками малинового цвета"
				/>
			</div>
			{/* <Image
				className={css.spot1}
				src={Spot1Pic}
				loading="lazy"
				aria-hidden="true"
				alt="Красивые цветные пятна с оттенком розового"
			/>
			<Image
				className={css.spot2}
				src={Spot2Pic}
				loading="lazy"
				aria-hidden="true"
				alt="Красивые цветные пятна с оттенком розового"
			/> */}
		</section>
	);
};

export default Cta;
