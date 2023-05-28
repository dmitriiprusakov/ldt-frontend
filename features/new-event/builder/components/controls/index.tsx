"use client";

import { Button, DatePicker, Form, InputNumber, Select } from "antd";
import React, { FC, memo } from "react";
import Link from "next/link";

import css from "./index.module.css";
import { useAppSelector } from "store";

import { useRouter } from "next/navigation";
import { Values } from "../../types";

const { RangePicker } = DatePicker;

type Props = {
	setChecklistValueCallback: (value: Values) => void;
}
const Controls: FC<Props> = ({
	setChecklistValueCallback,
}: Props) => {
	const router = useRouter();

	const checklistsData = useAppSelector((state) => state.core.checklistsData);

	const options = Object.keys(checklistsData).map((key) => ({
		value: key,
		label: checklistsData[key].title,
	}));

	const onValuesChange = (_: unknown, values: Values) => {
		setChecklistValueCallback(values);
	};

	const handleFinish = ({ eventType, timeRange, budget }: Values) => {
		console.log("handleFinish", { eventType, timeRange, budget });
		const from_ts = timeRange?.at(0)?.toISOString();
		const to_ts = timeRange?.at(-1)?.toISOString();

		const searchParams = new URLSearchParams();

		eventType && searchParams.set("et", eventType);
		budget && searchParams.set("b", `${budget}`);
		from_ts && searchParams.set("from", from_ts);
		to_ts && searchParams.set("to", to_ts);

		console.log("searchParams", searchParams.toString());

		router.push(`/search?${searchParams.toString()}`);
	};

	return (
		<>
			<Form
				className={css.form}
				layout="vertical"
				onFinish={handleFinish}
				onValuesChange={onValuesChange}
				requiredMark={false}
			>
				<Form.Item
					name="eventType"
					label="Тип мероприятия"
					rules={[{ required: true, message: "Обязательное поле" }]}
				>
					<Select options={options} />
				</Form.Item>
				<Form.Item
					name="timeRange"
					label="Дата проведения"
					rules={[{ type: "array" as const, required: true, message: "Обязательное поле" }]}
				>
					<RangePicker
						format={"DD.MM.YYYY"}
						className={css.rangePicker}
					/>
				</Form.Item>
				<Form.Item
					name="budget"
					label="Бюджет"
					rules={[{ required: true, message: "Обязательное поле" }]}
				>
					<InputNumber prefix="₽" step={1000} min={0} className={css.inputNumber} />
				</Form.Item>
				<Form.Item label=" " className={css.submitButtons}>
					<Button type="primary" htmlType="submit" >
						Следовать по чеклисту
					</Button>
					<Link href="/search" >
						<Button type="link">
							Создать вручную
						</Button>
					</Link>
				</Form.Item>
			</Form>
		</>
	);
};

export default memo(Controls);
