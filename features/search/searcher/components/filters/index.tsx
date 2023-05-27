import { Button, DatePicker, Form, Input, Slider, Switch } from "antd";
import { setFilters } from "core/redux/slice";
import { PlaceFilters } from "core/types";
import React, { FC } from "react";
import { useAppDispatch } from "store";

import css from "./index.module.css";

const { RangePicker } = DatePicker;

const Filters: FC = () => {
	const dispatch = useAppDispatch();

	const onFinish = (values: PlaceFilters) => {
		dispatch(setFilters(values));
	};

	return (
		<div className={css.filters}>
			<Form
				onFinish={onFinish}
				layout="vertical"
			>
				<div className={css.row}>
					<Form.Item
						name="search"
						label="Поиск"
					>
						<Input />
					</Form.Item>
					<Form.Item
						name="timeRange"
						label="Промежуток"
						rules={[{ type: "array" as const }]}

					>
						<RangePicker
						/>
					</Form.Item>
					<Form.Item label=" ">
						<Button type="primary" htmlType="submit">
							Найти
						</Button>
					</Form.Item>
				</div>
				<div className={css.row}>
					<Form.Item
						name="area"
						label="Площадь"
					>
						<Slider
							range={{ draggableTrack: true }}
							marks={{
								0: "0",
								10: "20",
								25: "40",
								50: "60",
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
								10: "20",
								25: "40",
								50: "60",
								100: "100",
							}}
						/>
					</Form.Item>
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
