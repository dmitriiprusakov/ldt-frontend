"use client";

import React, { FC } from "react";

import css from "./index.module.css";
import { Filters, Items, Sidebar } from "./components";
import store from "store";
import { Provider } from "react-redux";

const Searcher: FC = () => {
	return (
		<section>
			<div className={css.content}>
				<Provider store={store}>
					<Sidebar />
					<div>
						<Filters />
						<Items />
					</div>
				</Provider>
			</div>
		</section>
	);
};

export default Searcher;
