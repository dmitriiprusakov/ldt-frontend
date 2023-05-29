"use client";

import React, { FC, useCallback, useState } from "react";

import css from "./index.module.css";
import { Filters, Items, ServicesItems, Sidebar } from "./components";
import store from "store";
import { Provider } from "react-redux";
import { SearchItemShort, ServiceSearchItemShort } from "core/types";
import { Form, Select } from "antd";
import ThemeProvider from "core/theme";

const Searcher: FC = () => {
	const [event, setEvent] = useState<Record<string, SearchItemShort | ServiceSearchItemShort>>({});
	const [serviceType, setServiceType] = useState<string>("PLACE");

	const addEventCallback = useCallback((eventShortCut: SearchItemShort | ServiceSearchItemShort) => {
		const { type, ...restEvent } = eventShortCut;
		console.log("addEventCallback=", type, restEvent);
		setEvent((prev) => ({ ...prev, [type]: eventShortCut }));
	}, []);

	const changeServiceType = (value: string) => {
		setServiceType(value);
	};

	const ServicesComponent = () => {
		if (serviceType === "PLACE") return (
			<>
				<Filters />
				<Items
					addEventCallback={addEventCallback}
				/>
			</>
		);
		if (serviceType === "FLOWERS" || serviceType === "CATERING") return (
			<ServicesItems
				serviceType={serviceType}
				addEventCallback={addEventCallback}
			/>
		);
		return null;
	};

	return (
		<section>
			<div className={css.content}>
				<Provider store={store}>
					<ThemeProvider>
						<aside className={css.aside}>
							<Sidebar
								event={event}
							/>
						</aside>

						<div className={css.main}>
							<Form layout="vertical">
								<Form.Item label="Выберите тип мероприятия">
									<Select
										style={{ width: "100%", marginBottom: "1rem" }}
										onChange={changeServiceType}
										value={serviceType}
										options={[
											{ value: "PLACE", label: "Аренда площадки" },
											{ value: "FLOWERS", label: "Цветы и оформление" },
											{ value: "CATERING", label: "Фуршет" },
											{ value: "SECURITY", label: "Охрана", disabled: true },
										]}
									/>
								</Form.Item>
							</Form>
							<>
								{ServicesComponent()}
							</>
						</div>
					</ThemeProvider>
				</Provider>
			</div>
		</section>
	);
};

export default Searcher;
