/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
"use client";

import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, message, Upload } from "antd";

import { eventsFetcher, imagesFetcher } from "core/fetchers";
import ThemeProvider from "core/theme";
import { JsonRpcBody } from "core/types";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import css from "./index.module.css";

type FormValues = {
	title: string,
	description: string,
	address: string,
	phone: string,
	price: number;
	photo: File;
}

type ImageResult = {
	photo: {
		id: string;
		url: string;
	}
}
//accessToken положить в куки чтобы попала на бэк
export default function NewService() {
	const router = useRouter();

	const addService = async ({
		title, address, description, phone, photo, price,
	}: FormValues) => {
		const session = await getSession();
		console.log("session", session);

		if (!session) return;

		const form = new FormData();

		form.append("photo", photo);

		const { data: imageData } = await imagesFetcher.post<ImageResult>(
			"/",
			form
		);

		console.log("imageData=", imageData);

		const { data: addPlaceData } = await eventsFetcher.post<JsonRpcBody<any>>(
			"/",
			{
				method: "add_place",
				title,
				address,
				description,
				phone,
				price,
				photo_url: imageData.photo.url,
			},
			{
				headers: {
					"Authorization": session.user?.accessToken || "",
				},
			}
		);
		console.log("addPlaceData=", addPlaceData);

		if (addPlaceData.error || !addPlaceData.result) return;

		void message.success("Заявка отправлена на модерацию");

		setTimeout(() => {
			router.push("/");
		}, 3000);
	};

	const onFinish = (values: FormValues) => {
		console.log("Success:", values);
		void addService(values);
	};

	const normFile = (e: any) => {
		if (Array.isArray(e)) {
			return e;
		}
		return e?.file;
	};

	return (
		<section>
			<div className={css.content}>
				<ThemeProvider>
					<Form
						layout="vertical"
						name="basic"
						onFinish={onFinish}
					>
						<Form.Item
							label="Превью фото"
							name="photo"
							valuePropName="file"
							getValueFromEvent={normFile}
							rules={[{ required: true, message: "Обязательное поле" }]}
						>
							<Upload
								beforeUpload={() => false}
								maxCount={1}
								listType="picture-card"
							>
								<UploadOutlined />
							</Upload>
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
							rules={[{ required: true, message: "Обязательное поле" }]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							label="Телефон"
							name="phone"
							rules={[{ required: true, message: "Обязательное поле" }]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							label="Описание"
							name="description"
							rules={[{ required: true, message: "Обязательное поле" }]}
						>
							<Input.TextArea
								rows={4}
								maxLength={500}
								showCount
								allowClear
							/>
						</Form.Item>
						<Form.Item
							label="Цена аренды"
							name="price"
							rules={[{ required: true, message: "Обязательное поле" }]}
						>
							<InputNumber
								addonAfter="₽ / час"
								step={1000}
								min={0}
								max={100000}
								className={css.inputNumber}
							/>
						</Form.Item>

						<Form.Item>
							<Button type="primary" htmlType="submit">
								Создать
							</Button>
						</Form.Item>
					</Form>
				</ThemeProvider>
			</div>
		</section>
	);
}
