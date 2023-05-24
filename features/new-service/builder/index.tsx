/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
"use client";

import { Button, Form, Input, Select, Upload } from "antd";
import css from "./index.module.css";

import { InboxOutlined } from "@ant-design/icons";

export default function NewService() {

	const onFinish = (values: any) => {
		console.log("Success:", values);
	};

	const normFile = (e: any) => {
		console.log("Upload event:", e);
		if (Array.isArray(e)) {
			return e;
		}
		return e?.fileList;
	};

	return (
		<section>
			<div className={css.content}>
				<Form
					layout="vertical"
					name="basic"
					onFinish={onFinish}
				>
					<Form.Item
						noStyle
						name="image"
						valuePropName="fileList"
						getValueFromEvent={normFile}
					>
						<Upload.Dragger name="files" beforeUpload={() => false}>
							<p className="ant-upload-drag-icon">
								<InboxOutlined />
							</p>
							<p className="ant-upload-text">Click or drag file to this area to upload</p>
							<p className="ant-upload-hint">Support for a single or bulk upload.</p>
						</Upload.Dragger>
					</Form.Item>
					<Form.Item
						label="Название"
						name="name"
						rules={[{ required: true, message: "Обязательное поле" }]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="Тип услуги"
						name="type"
						rules={[{ required: true, message: "Обязательное поле" }]}
					>
						<Select allowClear>
							<Select.Option value="1">1</Select.Option>
						</Select>
					</Form.Item>

					<Form.Item
						label="Описание"
						name="description"

					>
						<Input.TextArea
							rows={4}
							maxLength={500}
							showCount
							allowClear
						/>
					</Form.Item>

					<Form.Item>
						<Button type="primary" htmlType="submit">
							Создать
						</Button>
					</Form.Item>
				</Form>
			</div>
		</section>
	);
}
