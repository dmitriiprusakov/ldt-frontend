"use client";

import { Button, Checkbox, Divider, Form, Select } from "antd";
import React, { FC } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import css from "./index.module.css";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import { AppDispatch, RootState } from "store";

import { setCurrentChecklist } from "core/redux/slice";
import Link from "next/link";

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const Matcher: FC = () => {
	const dispatch = useAppDispatch();
	const checklistsData = useAppSelector((state) => state.core.checklistsData);
	const currentChecklist = useAppSelector((state) => state.core.currentChecklist);

	const options = Object.keys(checklistsData).map((key) => ({
		value: key,
		label: checklistsData[key].title,
	}));

	const handleChangeChecklist = (value: string) => {
		console.log(value);

		dispatch(setCurrentChecklist(checklistsData[value]));
	};

	const handleCheck = (checkedValues: CheckboxValueType[]) => {
		console.log(checkedValues);
	};

	return (
		<section>
			<div className={css.content}>
				<Form layout="vertical">
					<Form.Item label="Тип мероприятия">
						<Select onChange={handleChangeChecklist} options={options} />
					</Form.Item>
				</Form>
				{currentChecklist && (

					<Checkbox.Group value={[]} onChange={handleCheck}>
						<div className={css.group}>
							{currentChecklist.planning.map(item => (
								<Checkbox
									key={item}
									value={item}
								>
									{item}
								</Checkbox>
							))}
						</div>

						<Divider />

						<div className={css.group}>
							{currentChecklist.recommendations.map(item => (
								<Checkbox
									key={item}
									value={item}
								>
									{item}
								</Checkbox>
							))}
						</div>

						<Divider />

						<div className={css.group}>
							{currentChecklist.design.map(item => (
								<Checkbox
									key={item}
									value={item}
								>
									{item}
								</Checkbox>
							))}
						</div>
					</Checkbox.Group>
				)}
				<Link href="/search" >
					<Button>
						Перейти к поиску
					</Button>
				</Link>
			</div>
		</section>
	);
};

export default Matcher;
