import React, { FC } from "react";

import css from "./index.module.css";

const Hero: FC = () => {
	return (
		<section>
			<div className={css.content}>
				<h1>Мой аккаунт</h1>
			</div>
		</section>
	);
};

export default Hero;
