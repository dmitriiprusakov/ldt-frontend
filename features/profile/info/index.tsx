/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
"use client";

import { Avatar, Card } from "antd";
import { useSession } from "next-auth/react";
import Link from "next/link";

import css from "./index.module.css";

export default function ProfileInfo() {
	const { data, status } = useSession();
	console.log("ProfileInfo=", data);
	return (
		<section>
			<div className={css.content}>

				<Card
					loading={status === "loading"}
				>
					<Card.Meta
						avatar={<Avatar src={data?.user.avatar_url} />}
						title={data?.user.fio}
						description={data?.user.email}
					/>
				</Card>

				{data?.user.admin && (
					<Link href={"/admin"}>
						Панель администратора
					</Link>)
				}
			</div>
		</section>
	);
}
