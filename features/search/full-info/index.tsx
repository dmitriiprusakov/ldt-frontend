/* eslint-disable @next/next/no-img-element */
"use client";

import { BookOutlined, MessageOutlined, ScheduleOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, Card, Carousel, Descriptions, Divider, Form, Input, List, Rate } from "antd";
import { eventsFetcher, ratingFetcher } from "core/fetchers";
import { Comment, CommentsResult, JsonRpcBody, PlaceResult } from "core/types";
import React, { FC, useEffect, useState } from "react";
import dayjs from "dayjs";

import css from "./index.module.css";
import { getSession } from "next-auth/react";
import AntdProvider from "core/theme";

const { Item } = Descriptions;

type CommentFormValues = {
	rating: number,
	comment: string,
}

type FullInfoProps = {
	id: string;
}
const FullInfo: FC<FullInfoProps> = ({ id }: FullInfoProps) => {
	const [info, setInfo] = useState<PlaceResult | null>(null);
	const [comments, setComments] = useState<Comment[] | null>([]);

	const [commentForm] = Form.useForm();

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

	const fetchComments = async (object_id: number) => {
		const { data } = await ratingFetcher.post<JsonRpcBody<CommentsResult>>(
			"/",
			{
				method: "get_comments",
				object_id: object_id,
				object_type: "PLACE",
			}
		);

		if (data.error || !data.result) return setComments([]);

		console.log("fetchComments=", data);
		setComments(data.result.items);
	};

	useEffect(() => {
		info?.place.id && void fetchComments(info?.place.id);
	}, [info?.place.id]);

	const sendComment = async ({ rating, comment }: CommentFormValues) => {
		const session = await getSession();

		if (!session?.user) return;

		const { data } = await ratingFetcher.post<JsonRpcBody<any>>(
			"/",
			{
				method: "add_comment",
				object_id: info?.place.id,
				object_type: "PLACE",
				rating: rating * 2,
				comment: comment,
			},
			{
				headers: {
					"Authorization": session.user.accessToken || "",
				},
			}
		);

		console.log("sendComment=", data);

		if (data.error || !data.result) return;

		info?.place.id && await fetchComments(info?.place.id);

		commentForm.resetFields();
	};

	const handleFinishComment = (values: CommentFormValues) => {
		console.log("handleFinishComment", values);
		void sendComment(values);
	};

	return (
		<section>
			<div className={css.content}>
				<AntdProvider>
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
									<Rate allowHalf value={(info?.place.rating ?? 0) / 2} disabled />
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
							{info?.place.main?.map(({ id, title, attributes }) => (
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
							{info?.place.equipment?.map(({ id, title }) => (
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

					<Divider />

					<Form form={commentForm} layout="vertical" onFinish={handleFinishComment}>
						<Form.Item
							name="rating"
							label="Оценка"
							rules={[{ required: true, message: "Обязательное поле" }]}
						>
							<Rate />
						</Form.Item>
						<Form.Item
							label="Комментарий"
							name="comment"
							rules={[{ required: true, message: "Обязательное поле" }]}
						>
							<Input.TextArea
								showCount
								rows={2}
								maxLength={300}
							/>
						</Form.Item>
						<Form.Item>
							<Button type="primary" htmlType="submit">
								Отправить
							</Button>
						</Form.Item>
					</Form>

					{comments && <List
						itemLayout="vertical"
						dataSource={comments}
						renderItem={(item) => (
							<List.Item>
								<List.Item.Meta
									avatar={<Avatar src={item.user.avatar_url} />}
									title={item.user.fio}
									description={dayjs(item.created_at).format("DD.MM.YYYY HH:mm")}
								/>
								<div>{item.text}</div>
							</List.Item>
						)}
					/>}
				</AntdProvider>
			</div>
		</section>
	);
};

export default FullInfo;
