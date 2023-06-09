import React, { FC } from "react";

import css from "./index.module.css";

const Hero: FC = () => {
	return (
		<section>
			<div className={css.content}>
				<h1>Личный кабинет</h1>
			</div>
		</section>
	);
};

export default Hero;
