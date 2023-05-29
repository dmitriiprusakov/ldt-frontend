/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Avatar, Button, Card, Checkbox, Divider, Empty, Form, Typography } from "antd";
import { eventsFetcher } from "core/fetchers";
import { JsonRpcBody, SearchItemShort, ServiceSearchItemShort } from "core/types";
import dayjs from "dayjs";
import { getSession, signIn } from "next-auth/react";
import React, { FC } from "react";
import { useAppSelector } from "store";
import { useRouter, useSearchParams } from "next/navigation";

import css from "./index.module.css";
import { FileProtectOutlined, SmileOutlined } from "@ant-design/icons";

const dict: Record<string, string> = {
	"hackathon": "Проведение хакатона",
	"album-recording": "Запись альбома",
	"art-exhibition": "Выставка картин",
};

type Props = {
	event: Record<string, SearchItemShort | ServiceSearchItemShort>;
}
const Sidebar: FC<Props> = ({ event }: Props) => {
	const checklistsData = useAppSelector((state) => state.core.checklistsData);
	const searchParams = useSearchParams();
	const router = useRouter();
	const eventType = searchParams.get("et") || "";

	const currentChecklist = checklistsData[eventType];

	const createEvent = async (event: Record<string, SearchItemShort | ServiceSearchItemShort>) => {
		const session = await getSession();

		if (!session?.user) return signIn();

		const from_ts = dayjs().toISOString();
		const to_ts = dayjs().toISOString();

		const services = Object.keys(event).map(serviceType => {
			const service = event[serviceType];
			return {
				type: serviceType,
				service_id: service.id,
				from_ts: from_ts,
				to_ts: to_ts,
			};
		});

		const { data } = await eventsFetcher.post<JsonRpcBody<any>>(
			"/",
			{
				method: "create_event",
				title: "Мероприятие",
				services: services,
			},
			{
				headers: {
					"Authorization": session.user.accessToken || "",
				},
			}
		);

		if (data.error || !data.result) return;

		console.log("data=", data);

		router.push("/me");
	};

	const handleSubmit = () => {
		console.log("handleSubmit=", event);

		void createEvent(event);
	};

	const eventKeys = Object.keys(event);

	console.log(eventKeys, event);

	return (
		<div className={css.content}>
			{eventType ? (
				<h3>{dict[eventType]}:</h3>
			) : (
				<h3>Выбранные услуги:</h3>
			)}

			{currentChecklist ? (
				<Checkbox.Group
					className={css.checkboxGroup}
					value={eventKeys}
				>
					<Divider orientation="left">Организация</Divider>

					<div className={css.group}>
						{currentChecklist.recommendations.map(({ title, active, type }) => (
							<div key={type ?? title} className={css.item}>
								<Checkbox
									key={type ?? title}
									value={type}
									disabled={!active}
								>
									{title} {!active && "(скоро появится)"}
								</Checkbox>
								{type && event[type] && (
									<Card size="small">
										<Card.Meta
											// @ts-ignore
											avatar={<Avatar size={"large"} shape="square" src={type === "PLACE" ? event[type].photo : event[type].images[0]} />}
											title={event[type].title}
											// @ts-ignore
											description={type === "PLACE" ? `${event[type].price} ₽` : `${event[type].min_price} - ${event[type].max_price} ₽`}
										/>
									</Card>
								)}
							</div>
						))}
					</div>

					<Divider orientation="left">Оформление</Divider>

					{/* <div className={css.group}>
						{currentChecklist.design.map(({ title, active, type }) => (
							<Checkbox
								key={type ?? title}
								checked={!!type}
								disabled={!active}
							>
								{title}
							</Checkbox>
						))}
					</div> */}
				</Checkbox.Group>
			) : (
				Object.keys(event).map(type => {
					const service = event[type];
					return (
						<Card key={type ?? service.title} style={{ marginBottom: "1rem" }}>
							<Card.Meta
								// @ts-ignore
								avatar={<Avatar size={"large"} shape="square" src={type === "PLACE" ? service.photo : service.images[0]} />}
								title={service.title}
								// @ts-ignore
								description={type === "PLACE" ? `${service.price} ₽` : `${service.min_price} - ${service.max_price} ₽`}
							/>
						</Card>
					);
				})
			)}

			{eventKeys.length > 0 ? (
				<Form onFinish={handleSubmit}>
					<Form.Item
						name="payment"
						valuePropName="checked"
						noStyle
					>
						<Checkbox disabled checked>
							Оплата
						</Checkbox>
					</Form.Item>

					<Form.Item
						name="offer"
						valuePropName="checked"
						rules={[{
							required: true,
							message: "Примите условия оферты?",
							validator: (_, value) =>
								value ? Promise.resolve() : Promise.reject(new Error("Примите условия оферты?")),
						}]}
					>
						<Checkbox>
							Принимаю {" "}
							<Typography.Link href="/docs/offer.pdf" target="_blank">
								оферту
							</Typography.Link>
						</Checkbox>
					</Form.Item>

					<Form.Item>
						<Button className={css.submit} type="primary" htmlType="submit">
							Создать мероприятие
						</Button>
					</Form.Item>
				</Form>
			) : (
				<Typography.Text type="secondary">
					Начните выбирать услуги
				</Typography.Text>
			)}
		</div>
	);
};

export default Sidebar;
