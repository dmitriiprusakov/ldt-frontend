import React, { FC, PropsWithChildren } from "react";

import css from "./index.module.css";

const Main: FC<PropsWithChildren> = ({ children }: PropsWithChildren) => {
	return (
		<main className={css.main}>
			<div className={css.content}>
				{children}
			</div>
		</main>
	);
};

export default Main;
