"use client";

import AntdProvider from "core/theme";
import React, { FC, useCallback, useState } from "react";
import { Provider } from "react-redux";

import store from "store";
import { Checklist, Controls } from "./components";

import css from "./index.module.css";
import { Values } from "./types";

const Builder: FC = () => {
	const [currentChecklist, setCurrentChecklist] = useState<string | null>(null);
	const [checklistValue, setChecklistValue] = useState<Record<string, boolean>>({});

	const setChecklistValueCallback = useCallback(({ eventType, timeRange, budget }: Values) => {
		if (eventType) {
			setCurrentChecklist(eventType);
			setChecklistValue((prev) => ({ ...prev, TYPE: true }));
		}

		if (timeRange) setChecklistValue((prev) => ({ ...prev, DATE: true }));

		if (budget) setChecklistValue((prev) => ({ ...prev, BUDGET: true }));
	}, []);

	return (
		<section>
			<div className={css.content}>
				<Provider store={store}>
					<AntdProvider>
						<aside className={css.aside}>
							<Checklist
								currentChecklistId={currentChecklist}
								checklistValue={checklistValue}
							/>
						</aside>

						<div className={css.main}>
							<Controls
								setChecklistValueCallback={setChecklistValueCallback}
							/>
						</div>
					</AntdProvider>
				</Provider>
			</div>
		</section>
	);
};

export default Builder;
