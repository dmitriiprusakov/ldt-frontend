"use client";

import { Checkbox, Divider } from "antd";
import React, { FC } from "react";

import { useAppSelector } from "store";
import css from "./index.module.css";

const planningChecklist = [
	{
		"title": "Выбрать тип мероприятия",
		"active": true,
		"type": "TYPE",
	},
	{
		"title": "Выбрать дату и время проведения",
		"active": true,
		"type": "DATE",
	},
	{
		"title": "Определить бюджет",
		"active": true,
		"type": "BUDGET",
	},
];

type Props = {
	currentChecklistId: string | null;
	checklistValue: Record<string, boolean>;
}
const Checklist: FC<Props> = ({
	currentChecklistId,
	checklistValue,
}: Props) => {
	const checklistsData = useAppSelector((state) => state.core.checklistsData);

	const value = Object.keys(checklistValue).filter(key => checklistValue[key]);

	return (
		<>
			<Checkbox.Group
				value={value}
				className={css.checkboxGroup}
			>
				<Divider orientation="left">Планирование</Divider>

				<div className={css.group}>
					{planningChecklist.map(({ title, active, type }) => (
						<Checkbox
							key={title}
							value={type}
							disabled={!active}
						>
							{title}
						</Checkbox>
					))}
				</div>

				{currentChecklistId && (
					<>
						<Divider orientation="left">Организация</Divider>

						<div className={css.group}>
							{checklistsData[currentChecklistId].recommendations.map(({ title, active }) => (
								<Checkbox
									key={title}
									value={title}
									disabled={!active}
								>
									{title} {!active && "(скоро появится)"}
								</Checkbox>
							))}
						</div>

						<Divider orientation="left">Оформление</Divider>

						<div className={css.group}>
							{checklistsData[currentChecklistId].design.map(({ title, active }) => (
								<Checkbox
									key={title}
									value={title}
									disabled={!active}
								>
									{title}
								</Checkbox>
							))}
						</div>
					</>
				)}
			</Checkbox.Group>
		</>
	);
};

export default Checklist;
