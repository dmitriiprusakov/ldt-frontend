/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
"use client";

import { DownOutlined, EditOutlined, FundViewOutlined, PlusOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Descriptions, List, Tag } from "antd";
import { eventsFetcher } from "core/fetchers";
import AntdProvider from "core/theme";
import { Event, EventsResult, JsonRpcBody, User, Place, MyServicesResult } from "core/types";
import dayjs from "dayjs";
import { getSession, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import css from "./index.module.css";

export default function ProfileInfo() {
	const session = useSession();
	const [myEvents, setMyEvents] = useState<Event[]>([]);
	const [myServices, setMyServices] = useState<Place[]>([]);

	const user = session.data?.user as unknown as User;

	useEffect(() => {
		const fetchMyEvents = async () => {
			const session = await getSession();

			if (!session) return;

			const { data: myEventsData } = await eventsFetcher.post<JsonRpcBody<EventsResult>>(
				"/",
				{
					method: "get_events",
					limit: 100,
					only_my: true,
				},
				{
					headers: {
						"Authorization": session.user?.accessToken || "",
					},
				}
			);

			if (myEventsData.error || !myEventsData.result?.items) return setMyEvents([]);

			setMyEvents(myEventsData.result.items);
		};

		void fetchMyEvents();
	}, []);

	useEffect(() => {
		const fetchMyServices = async () => {
			const session = await getSession();

			if (!session) return;

			const { data: myServicesData } = await eventsFetcher.post<JsonRpcBody<MyServicesResult>>(
				"/",
				{
					method: "my_places",
					limit: 100,
				},
				{
					headers: {
						"Authorization": session.user?.accessToken || "",
					},
				}
			);

			if (myServicesData.error || !myServicesData.result?.items) return setMyServices([]);

			setMyServices(myServicesData.result.items);
		};

		void fetchMyServices();
	}, []);

	return (
		<section>
			<div className={css.content}>
				<AntdProvider>
					<div className={css.personalInfo}>
						<Descriptions
							className={css.personalDescriptions}
							layout="vertical"
							title={
								<div className={css.heading}>
									<h2>Личные данные</h2>
									<Link href={"/me"}>
										<Button icon={<EditOutlined />} type="link">
											Редактировать
										</Button>
									</Link>
									{user?.admin && (
										<Link href={"/admin"}>
											<Button icon={<FundViewOutlined />} type="link">
												Перейти панели администратора
											</Button>
										</Link>
									)}
								</div>
							}
							column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }}
						>
							<Descriptions.Item label="ФИО">
								{user?.fio}
							</Descriptions.Item>
							<Descriptions.Item label="E-mail">
								{user?.email}
							</Descriptions.Item>
							<Descriptions.Item label="Компания">
								{user?.vendor?.title || "Не привязана"}
							</Descriptions.Item>
							<Descriptions.Item label="Телефон">
								{user?.vendor?.phone || "Не привязан"}
							</Descriptions.Item>
						</Descriptions>
						<Image
							alt="Моя аватарка"
							height={160}
							width={160}
							src={user?.avatar_url}
						/>
					</div>
					<div className={css.heading}>
						<h2>Мои мероприятия</h2>
						<Button type="link" icon={<DownOutlined />}>
							Показать все
						</Button>
						<Link href={"/new-event"}>
							<Button icon={<PlusOutlined />} type="link">
								Создать новое
							</Button>
						</Link>
					</div>
					<div className={css.eventHistory}>
						{myEvents.map((event, index) => (
							index < 6 && <Card
								key={event.id}
								title={event.title}
								extra={dayjs(event.created_at).format("DD.MM.YYYY")}
							>
								<List
									size="small"
									itemLayout="horizontal"
									dataSource={event.items || []}
									renderItem={(item) => (
										<List.Item>
											<List.Item.Meta
												// @ts-ignore
												avatar={<Avatar size={"large"} shape="square" src={item.type === "PLACE" ? item.photo : item.images[0]} />}
												title={item.title}
											/>
										</List.Item>
									)}
								/>
							</Card>
						))}
					</div>
					<div className={css.heading}>
						<h2>Мои услуги</h2>
						<Button type="link" icon={<DownOutlined />}>
							Показать все
						</Button>
						<Link href={"/new-service"}>
							<Button type="link" icon={<PlusOutlined />}>
								Добавить услугу
							</Button>
						</Link>
					</div>
					<div className={css.servicesHistory}>
						{myServices.map((service, index) => (
							index < 6 && <Card
								key={service.id}
								title={service.title}
								extra={service.public
									? <Tag color="success">Одобрена</Tag>
									: <Tag color="processing">На модерации</Tag>}
								cover={
									<Image
										width={160}
										height={160}
										alt="Фотография услуги"
										src={service.photo}
									/>
								}
							>
								<Card.Meta
									title={dayjs(service.created_at).format("DD.MM.YYYY")}
									description={service.description}
								/>
							</Card>
						))}
					</div>
				</AntdProvider>
			</div>
		</section>
	);
}
