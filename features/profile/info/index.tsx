/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
"use client";

import { Avatar, Card, List, Typography } from "antd";
import { eventsFetcher } from "core/fetchers";
import ThemeProvider from "core/theme";
import { Event, EventsResult, JsonRpcBody, User } from "core/types";
import dayjs from "dayjs";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

import css from "./index.module.css";

export default function ProfileInfo() {
	const session = useSession();
	const [myEvents, setMyEvents] = useState<Event[]>([]);

	const status = session.status;
	const user = session.data?.user as unknown as User;

	useEffect(() => {
		const fetchMyEvents = async () => {
			const session = await getSession();
			console.log("session", session);

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

			console.log(myEventsData);

			if (myEventsData.error || !myEventsData.result?.items) return setMyEvents([]);

			setMyEvents(myEventsData.result.items);
		};

		void fetchMyEvents();
	}, []);

	return (
		<section>
			<div className={css.content}>
				<ThemeProvider>
					<Card
						loading={status === "loading"}
						title={user?.fio}
						extra={
							user?.admin && (
								<Link href={"/admin"}>
									<Typography.Link style={{ fontSize: "2rem" }}>
										Перейти панели администратора
									</Typography.Link>
								</Link>
							)
						}
					>
						<Card.Meta
							avatar={<Avatar src={user?.avatar_url} />}
							title={user?.email}
						/>
					</Card>
					<h2 style={{ marginBottom: "1rem" }}>История мероприятий:</h2>
					{myEvents.map(event => (
						<Card
							size="small"
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
				</ThemeProvider>
			</div>
		</section>
	);
}
