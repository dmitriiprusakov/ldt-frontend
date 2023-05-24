"use client";

/* eslint-disable @next/next/no-img-element */
import { Button, Card, Form, Input, Select, Slider, Switch } from "antd";
import React, { FC, useEffect, useState } from "react";

import { eventsFetcher } from "core/fetchers";
import { JsonRpcBody, SearchItem, SearchResult } from "core/types";

import css from "./index.module.css";

type FormValues = {
	search?: string,
	type?: string,
	area?: string,
	capacity?: string,
	chairs?: boolean,
	tables?: boolean,
}

const { Option } = Select;

const Searcher: FC = () => {
	const [searchedItems, setSearchedItems] = useState<SearchItem[]>([]);

	useEffect(() => {
		void fetchData({});
	}, []);

	const onFinish = (values: FormValues) => {
		console.log("FormValues=", values);
		void fetchData(values);
	};

	const fetchData = async ({ search, capacity, area, chairs, tables }: FormValues) => {
		const { data: seacrhData } = await eventsFetcher.post<JsonRpcBody<SearchResult>>(
			"/",
			{
				method: "search_places",
				query: search || undefined,
				limit: 10,
				props: {
					"вместимость": capacity,
					"площадь": area,
					"стулья": chairs,
					"столы": tables,
				},
			}
		);

		if (seacrhData.error || !seacrhData.result) return setSearchedItems([]);

		console.log("seacrhData=", seacrhData);
		setSearchedItems(seacrhData.result.items);
	};

	return (
		<section className={css.searcher}>
			{/* <aside className={css.aside}>
				Чек-лист
			</aside> */}
			<div className={css.content}>
				<div className={css.filters}>
					<Form
						onFinish={onFinish}
						layout="vertical"
					>
						<div className={css.row}>
							<Form.Item
								name="search"
								label="Поиск"
							>
								<Input />
							</Form.Item>
							<Form.Item label=" ">
								<Button type="primary" htmlType="submit">
									Найти
								</Button>
							</Form.Item>
						</div>
						<div className={css.row}>
							<Form.Item
								name="type"
								label="Тип помещения"
							>
								<Select
									allowClear
								>
									<Option value="male">male</Option>
								</Select>
							</Form.Item>
							<Form.Item
								name="area"
								label="Площадь"
							>
								<Slider
									range={{ draggableTrack: true }}
									marks={{
										0: "0",
										10: "20",
										25: "40",
										50: "60",
										100: "100",
									}}
								/>
							</Form.Item>
							<Form.Item
								name="capacity"
								label="Вместимость"
							>
								<Slider
									range={{ draggableTrack: true }}
									marks={{
										0: "0",
										10: "20",
										25: "40",
										50: "60",
										100: "100",
									}}
								/>
							</Form.Item>
							<Form.Item name="chairs" label="Стулья" valuePropName="checked">
								<Switch />
							</Form.Item>
							<Form.Item name="tables" label="Столы" valuePropName="checked">
								<Switch />
							</Form.Item>
						</div>
					</Form>
				</div>
				<div className={css.items}>
					{searchedItems.map(({ id, title, description, photo }) => (
						<Card
							key={id}
							className={css.card}
							hoverable
							cover={
								<img
									loading="lazy"
									alt="example"
									src={photo}
								/>
							}
						>
							<Card.Meta
								title={title}
								description={description}
							/>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
};

export default Searcher;
