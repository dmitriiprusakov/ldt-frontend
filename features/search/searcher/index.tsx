"use client";

/* eslint-disable @next/next/no-img-element */
import { Button, Card, Form, Input, Select } from "antd";
import React, { FC, useEffect, useState } from "react";

import { eventsFetcher } from "core/fetcher";
import { JsonRpcBody, SearchItem, SearchResult } from "core/types";

import css from "./index.module.css";

type FormValues = {
	search?: string,
	type?: string,
	area?: string,
	capacity?: string,
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

	const fetchData = async ({ search }: FormValues) => {
		const { data: seacrhData } = await eventsFetcher.post<JsonRpcBody<SearchResult>>(
			"/",
			{
				method: "search_places",
				query: search,
				limit: 10,
			}
		);

		console.log("seacrhData=", seacrhData);
		setSearchedItems(seacrhData.result?.items || []);
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
								label="Метраж"
							>
								<Select
									allowClear
								>
									<Option value="male">male</Option>
								</Select>
							</Form.Item>
							<Form.Item
								name="capacity"
								label="Вместимость"
							>
								<Select
									allowClear
								>
									<Option value="male">male</Option>
								</Select>
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
