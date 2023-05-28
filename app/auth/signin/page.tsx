"use client";

import { Button, Form, Input } from "antd";
import ThemeProvider from "core/theme";
import { signIn } from "next-auth/react";
import Link from "next/link";

import css from "./page.module.css";

type FormFields = {
	email: string;
	password: string;
}

export default function SignInPage() {

	const onFinish = ({ email, password }: FormFields) => {
		console.log("Success:", { email, password });

		signIn("credentials", {
			email: email,
			password: password,
			redirect: true,
			callbackUrl: "/",
		}).then(result => {
			console.log("result:", result);
		}).catch(error => {
			console.log("error:", error);
		});
	};

	return (
		<div className={css.signin}>
			<ThemeProvider>
				<Form
					layout="vertical"
					onFinish={onFinish}
				>
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

					<Form.Item noStyle>
						<div className={css.row}>
							<Button type="primary" htmlType="submit">
								Войти
							</Button>
							<Link href="/auth/signup">Регистрация</Link>
						</div>
					</Form.Item>
				</Form>
			</ThemeProvider>
		</div>
	);
}
