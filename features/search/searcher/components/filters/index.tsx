import { Button, DatePicker, Form, Input, Slider, Switch } from "antd";
import { setFilters } from "core/redux/slice";
import { PlaceFilters } from "core/types";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import React, { FC, useEffect, useMemo } from "react";
import { useAppDispatch } from "store";

import css from "./index.module.css";

const { RangePicker } = DatePicker;

const Filters: FC = () => {
	const dispatch = useAppDispatch();
	const searchParams = useSearchParams();

	const from = searchParams.get("from") || "";
	const to = searchParams.get("to") || "";

	useEffect(() => {
		const filtersPresetFromUrl = {
			timeRange: (from && to) ? [from, to] as [string, string] : undefined,
		};

		dispatch(setFilters(filtersPresetFromUrl));
	}, [dispatch, from, searchParams, to]);

	const onFinish = (values: PlaceFilters) => {
		dispatch(setFilters(values));
	};

	const fields = useMemo(() => ([{
		name: ["timeRange"],
		value: (from && to) ? [dayjs(from), dayjs(to)] : null,
	}]), [from, to]);

	return (
		<div className={css.filters}>
			<Form
				onFinish={onFinish}
				layout="vertical"
				fields={fields}
			>
				<div className={css.row}>
					<Form.Item
						name="search"
						label="Поиск"
					>
						<Input allowClear />
					</Form.Item>
					<Form.Item label=" ">
						<Button type="primary" block htmlType="submit">
							Найти
						</Button>
					</Form.Item>
				</div>
				<div className={css.row1}>
					<Form.Item
						name="timeRange"
						label="Временной промежуток"
						rules={[{ type: "array" as const }]}
					>
						<RangePicker
							style={{ width: "100%" }}
							placeholder={["", ""]}
							format={"DD.MM.YYYY"}
						/>
					</Form.Item>
				</div>
				<div className={css.row2}>
					<Form.Item
						name="area"
						label="Площадь"
					>
						<Slider
							range={{ draggableTrack: true }}
							marks={{
								0: "0",
								10: "10",
								25: "25",
								50: "50",
								100: "100",
							}}
						/>
					</Form.Item>
					<Form.Item
						name="capacity"
						label="Вместимость"
					>
						<Slider
							range={{ draggableTrack: true }}
							marks={{
								0: "0",
								10: "10",
								25: "25",
								50: "50",
								100: "100",
							}}
						/>
					</Form.Item>
				</div>
				<div className={css.row2}>
					<Form.Item name="chairs" label="Стулья" valuePropName="checked">
						<Switch />
					</Form.Item>
					<Form.Item name="tables" label="Столы" valuePropName="checked">
						<Switch />
					</Form.Item>
				</div>
			</Form>
		</div>
	);
};

export default Filters;
