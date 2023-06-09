import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

import Spot3Pic from "public/Spot3.png";
import Spot4Pic from "public/Spot4.png";

import css from "./index.module.css";
import clsx from "clsx";

type Props = {
	title: string;
	subtitle: string;
	hint: string;
	linkHref: string;
	linkText: string;
	links: string[];
	spotOnLeft: boolean
}
const Cases: FC<Props> = ({
	title,
	subtitle,
	hint,
	linkHref,
	linkText,
	links,
	spotOnLeft,
}: Props) => {
	return (
		<section className={css.section}>
			<div className={css.content}>
				<div className={css.left}>
					<h2>
						{title}
					</h2>
					<ul className={css.links}>
						{links.map(link => (
							<li key={link}>
								<Link href={"/new-event"}>
									{link}
								</Link>
							</li>
						))}
					</ul>
				</div>
				<div className={css.right}>
					<h3>
						{subtitle}
					</h3>
					<p>
						{hint}
					</p>
					<Link
						href={linkHref}
						className={css.link}
					>
						{linkText}
					</Link>
				</div>
			</div>
			<Image
				className={clsx(
					spotOnLeft ? css.spotLeft : css.spotRight
				)}
				src={spotOnLeft ? Spot3Pic : Spot4Pic}
				loading="lazy"
				aria-hidden="true"
				alt="Красивые цветные пятна с оттенком розового"
			/>
		</section>
	);
};

export default Cases;
