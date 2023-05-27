"use client";

import React, { FC, useCallback, useState } from "react";

import css from "./index.module.css";
import { Filters, Items, Sidebar } from "./components";
import store from "store";
import { Provider } from "react-redux";
import { SearchItemShort } from "core/types";

const Searcher: FC = () => {
	const [event, setEvent] = useState<Record<string, SearchItemShort>>({});

	const addEventCallback = useCallback((eventShortCut: SearchItemShort) => {
		console.log("addEventCallback=", eventShortCut);
		setEvent((prev) => ({ ...prev, PLACE: eventShortCut }));
	}, []);

	return (
		<section>
			<div className={css.content}>
				<Provider store={store}>
					<aside className={css.aside}>
						<Sidebar
							event={event}
						/>
					</aside>

					<div className={css.main}>
						<Filters />
						<Items
							addEventCallback={addEventCallback}

						/>
					</div>
				</Provider>
			</div>
		</section>
	);
};

export default Searcher;
