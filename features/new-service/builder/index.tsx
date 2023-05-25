/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
"use client";

import { InboxOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload } from "antd";

import { eventsFetcher } from "core/fetchers";
import { JsonRpcBody } from "core/types";
import { getSession } from "next-auth/react";

import css from "./index.module.css";

type FormValues = {
	title: string,
	description: string,
	address: string,
	phone: string,
}

//accessToken положить в куки чтобы попала на бэк
export default function NewService() {

	const addService = async ({ title, address, description, phone }: FormValues) => {
		const session = await getSession();
		console.log("session", session);

		if (!session) return;

		const { data: addPlaceData } = await eventsFetcher.post<JsonRpcBody<any>>(
			"/",
			{
				method: "add_place",
				title,
				address,
				description,
				phone,
			},
			{
				headers: {
					"Authorization": session.user?.accessToken || "",
				},
			}
		);
		console.log(addPlaceData);

		// console.log(vendorsData);
	};

	const onFinish = (values: FormValues) => {
		console.log("Success:", values);
		void addService(values);
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
						name="title"
						rules={[{ required: true, message: "Обязательное поле" }]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="Адрес"
						name="address"
					// rules={[{ required: true, message: "Обязательное поле" }]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="Телефон"
						name="phone"
					// rules={[{ required: true, message: "Обязательное поле" }]}
					>
						<Input />
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
