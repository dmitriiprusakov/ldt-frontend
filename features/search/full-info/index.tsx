/* eslint-disable @next/next/no-img-element */
"use client";

import { BookOutlined, MessageOutlined, ScheduleOutlined } from "@ant-design/icons";
import { Avatar, Badge, Calendar, Card, Carousel, ConfigProvider, Descriptions, Form, Input, List, Rate } from "antd";
import { eventsFetcher } from "core/fetchers";
import { JsonRpcBody, PlaceResult } from "core/types";
import React, { FC, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import ruRU from "antd/locale/ru_RU";

import css from "./index.module.css";

const { Item } = Descriptions;

const comments = [
	{
		user: "Пользователь",
		description: "Прикольно 1",
	},
	{
		user: "Пользователь",
		description: "Прикольно 2",
	},
	{
		user: "Пользователь",
		description: "Прикольно 3",
	},
	{
		user: "Пользователь",
		description: "Прикольно 4",
	},
];

type FullInfoProps = {
	id: string;
}
const FullInfo: FC<FullInfoProps> = ({ id }: FullInfoProps) => {
	const [info, setInfo] = useState<PlaceResult | null>(null);

	const [value, setValue] = useState(() => dayjs("2017-01-25"));

	useEffect(() => {
		const fetchData = async () => {
			const { data } = await eventsFetcher.post<JsonRpcBody<PlaceResult>>(
				"/",
				{
					method: "get_place",
					place_id: id,
				}
			);

			if (data.error || !data.result) return setInfo(null);

			console.log("data=", data);
			setInfo(data.result);
		};

		void fetchData();
	}, [id]);

	const onSelect = (newValue: Dayjs) => {
		console.log("onSelect", { newValue });

		setValue(newValue);
	};

	const onPanelChange = (newValue: Dayjs) => {
		console.log("onPanelChange", { newValue });

		setValue(newValue);
	};

	return (
		<section>
			<div className={css.content}>
				<ConfigProvider locale={ruRU}>
					<Card
						className={css.card}
						cover={
							<img
								alt="photo"
								src={info?.place.photo}
							/>
						}
						actions={[
							<BookOutlined key="book" />,
							<MessageOutlined key="message" />,
							<ScheduleOutlined key="schedule" />,
						]}
					>
						<Card.Meta
							title={
								<>
									{info?.place.title}
									<Rate value={10} />
								</>
							}
							description={info?.place.description}
						/>

						<Descriptions
							className={css.descriptions}
						>
							<Item label="Телефон">
								{info?.place.phone}
							</Item>
							<Item label="Адрес">
								{info?.place.address}
							</Item>
						</Descriptions>

						<Descriptions
							className={css.descriptions}
							layout="vertical"
							bordered
						>
							{info?.place.main.map(({ id, title, attributes }) => (
								<Item key={id} label={title}>
									{attributes.value}
								</Item>
							))}
						</Descriptions>
						<Descriptions
							className={css.descriptions}
							layout="vertical"
							bordered
						>
							{info?.place.equipment.map(({ id, title }) => (
								<Item key={id} label={title}>
									<Badge status="success" text="Есть" />
								</Item>
							))}

						</Descriptions>
					</Card>

					<Carousel
						className={css.carousel}
					>
						<img
							alt="photo"
							src={info?.place.photo}
						/>
						<img
							alt="photo"
							src={info?.place.photo}
						/>
						<img
							alt="photo"
							src={info?.place.photo}
						/>
					</Carousel>

					<Calendar
						mode='month'
						value={value}
						onSelect={onSelect}
						onPanelChange={onPanelChange}
					/>

					<Form layout="vertical">
						<Form.Item
							label="Оставьте комментарий"
							name="comment"
						>
							<Input.TextArea showCount maxLength={300} rows={2} />
						</Form.Item>
					</Form>

					<List
						itemLayout="horizontal"
						dataSource={comments}
						renderItem={(item, index) => (
							<List.Item>
								<List.Item.Meta
									avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
									title={item.user}
									description={item.description}
								/>
							</List.Item>
						)}
					/>
				</ConfigProvider>
			</div>
		</section>
	);
};

export default FullInfo;
