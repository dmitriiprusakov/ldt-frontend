"use client";

import React, { FC } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const Profile: FC = () => {
	const { status } = useSession();

	const handleSignIn = () => {
		void signIn();
	};

	const handleSignOut = () => {
		void signOut({
			redirect: true,
			callbackUrl: "/",
		});
	};

	if (status === "loading") return (
		<Link href="/me">
			Личный кабинет
		</Link>
	);

	if (status === "authenticated") return (
		<>
			<Link href="/me">
				Личный кабинет
			</Link>
			<span style={{ marginLeft: "1rem" }} onClick={handleSignOut}>
				Выйти
			</span>
		</>
	);

	return (
		<>
			<span onClick={handleSignIn}>
				Войти
			</span>
		</>
	);
};

export default Profile;
