import { Avatar, Button, Card, Checkbox, Divider } from "antd";
import { eventsFetcher } from "core/fetchers";
import { JsonRpcBody, SearchItemShort } from "core/types";
import dayjs from "dayjs";
import { getSession } from "next-auth/react";
import React, { FC } from "react";
import { useAppSelector } from "store";
import type { CheckboxValueType } from "antd/es/checkbox/Group";

import css from "./index.module.css";

type Props = {
	event: Record<string, SearchItemShort>;
}
const Sidebar: FC<Props> = ({ event }: Props) => {
	const currentChecklist = useAppSelector((state) => state.core.currentChecklist);

	const createEvent = async ({ search, capacity, area, chairs, tables, timeRange }: any) => {
		const session = await getSession();

		if (!session?.user) return;

		const from_ts = dayjs().toISOString();
		const to_ts = dayjs().toISOString();

		const { data } = await eventsFetcher.post<JsonRpcBody<any>>(
			"/",
			{
				method: "create_event",
				title: "!!!test event!!!",
				services: [
					{
						type: "PLACE",
						service_id: 2039,
						from_ts: from_ts,
						to_ts: to_ts,
					},
				],
			},
			{
				headers: {
					"Authorization": session.user.accessToken || "",
				},
			}
		);

		if (data.error || !data.result) return;

		console.log("data=", data);
	};

	const handleSubmit = () => {
		void createEvent({});
	};

	const handleCheck = (checkedValues: CheckboxValueType[]) => {
		console.log("handleCheck checkedValues=", checkedValues);
	};

	const checklistValue = Object.keys(event);
	console.log("checklistValue=", checklistValue, event);

	return (
		<div className={css.content}>
			{currentChecklist && (
				<Checkbox.Group
					className={css.checkboxGroup}
					value={checklistValue}
					onChange={handleCheck}
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
											avatar={<Avatar size={"large"} shape="square" src={event[type].photo} />}
											title={event[type].title}
											description={`${event[type].price} ₽`}
										/>
									</Card>
								)}
							</div>
						))}
					</div>

					<Divider orientation="left">Оформление</Divider>

					<div className={css.group}>
						{currentChecklist.design.map(({ title, active }) => (
							<Checkbox
								key={title}
								value={title}
								disabled={!active}
							>
								{title}
							</Checkbox>
						))}
					</div>
				</Checkbox.Group>
			)}
			<Button type="primary" onClick={handleSubmit}>
				Создать мероприятие
			</Button>
		</div>
	);
};

export default Sidebar;
