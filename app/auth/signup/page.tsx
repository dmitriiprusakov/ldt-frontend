"use client";

import { Button, Divider, Form, Input, Select } from "antd";
import { passportFetcher } from "core/fetchers";
import { JsonRpcBody, Vendor, VendorResult } from "core/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Cookies from "js-cookie";

import css from "./page.module.css";

const { Option } = Select;

type FormFields = {
	fio: string;
	email: string;
	password: string;
	vendor_id: number;
}

export default function SignUpPage() {
	const router = useRouter();

	const [vendors, setVendors] = useState<Vendor[]>([]);

	useEffect(() => {
		const fetchVendors = async () => {
			const { data: vendorsData } = await passportFetcher.post<JsonRpcBody<VendorResult>>(
				"/",
				{
					method: "search_vendors",
					limit: 100,
				}
			);
			console.log(vendorsData);

			if (!vendorsData.result || vendorsData.error) return setVendors([]);

			setVendors(vendorsData.result.items);
		};

		void fetchVendors();
	}, []);

	const signUp = async ({ fio, email, password, vendor_id }: FormFields) => {
		console.log("Success:", { fio, email, password, vendor_id });

		const { data: signupData } = await passportFetcher.post<JsonRpcBody<string>>(
			"/",
			{
				method: "signup",
				fio: fio,
				email: email,
				password: password,
				vendor_id: vendor_id,
			}
		);
		console.log(signupData);

		if (!signupData.result || signupData.error) return;

		Cookies.set("next-auth.session-token", signupData.result);

		void router.push("/");
	};

	const onFinish = (values: FormFields) => {
		void signUp(values);
	};

	return (
		<div className={css.signup}>
			<Form
				layout="vertical"
				onFinish={onFinish}
				autoComplete="off"
			>
				<Form.Item
					label="Имя"
					name="fio"
					rules={[{ required: true, message: "Обязательное поле" }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="E-mail"
					name="email"
					rules={[{ required: true, message: "Обязательное поле" }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Пароль"
					name="password"
					rules={[{ required: true, message: "Обязательное поле" }]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item>
					<div className={css.row}>
						<Button type="primary" htmlType="submit">
							Зарегистрироваться
						</Button>

						<Link href="/auth/signin">Войти</Link>
					</div>
				</Form.Item>

				<Divider plain>Дополнительно</Divider>

				<Form.Item
					name="vendor_id"
					label="Предоставляю компанию"
				>
					<Select allowClear>
						{vendors.map(({ id, title }) => (
							<Option key={id} value={id}>{title}</Option>
						))}
					</Select>
				</Form.Item>

				{/* <Form.Item
					name="vendor_type"
					label="Предоставляю услуги как"
				>
					<Select allowClear>
						<Option value="IP">ИП</Option>
						<Option value="FIZIK">Самозанятый</Option>
					</Select>
				</Form.Item> */}
			</Form>
		</div>
	);
}
