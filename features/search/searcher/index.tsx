"use client";

import { Button, Form, Input, Select } from "antd";
import React, { FC, useEffect } from "react";

import css from "./index.module.css";

const { Option } = Select;

const Searcher: FC = () => {

	const onFinish = (values: any) => {
		console.log(values);
	};

	useEffect(() => {
		async function fetchData() {
			const res = await fetch("/api/search");

			const product = await res.json();

			console.log(product);
		}

		void fetchData();
	}, []);

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
					data
				</div>
			</div>
		</section>
	);
};

export default Searcher;
