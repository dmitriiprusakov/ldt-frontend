"use client";

import { Checkbox, Divider } from "antd";
import React, { FC } from "react";

import { useAppSelector } from "store";
import css from "./index.module.css";

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
			{currentChecklistId && (
				<Checkbox.Group
					value={value}
				>
					<Divider orientation="left">Создание мероприятия</Divider>

					<div className={css.group}>
						{checklistsData[currentChecklistId].planning.map(({ title, active, type }) => (
							<Checkbox
								key={title}
								value={type}
								disabled={!active}
							>
								{title}
							</Checkbox>
						))}
					</div>

					<Divider orientation="left">Организация мероприятия</Divider>

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

					<Divider orientation="left">Оформление мероприятия</Divider>

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
				</Checkbox.Group>
			)}
		</>
	);
};

export default Checklist;
