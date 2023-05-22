"use client";

import React, { FC } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "antd";

const Profile: FC = () => {
	const { data, status } = useSession();

	console.log("session data=", data, status);

	const handleSignIn = () => {
		void signIn();
	};

	const handleSignOut = () => {
		void signOut();
	};

	if (status === "loading") return null;

	if (status === "authenticated") return (
		<Button onClick={handleSignOut}>
			SignOUT
		</Button>
	);

	return (
		<Button onClick={handleSignIn}>
			SignIN
		</Button>
	);
};

export default Profile;
