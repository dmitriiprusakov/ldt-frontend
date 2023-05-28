"use client";

import { Footer, Header, Main } from "core/layouts";
import { Hero, ProfileInfo } from "features/profile";
import { SessionProvider } from "next-auth/react";

export default function ProfilePage() {
	return (
		<>
			<Header />
			<Main>
				<SessionProvider>
					<Hero />
					<ProfileInfo />
				</SessionProvider>
			</Main>
			<Footer />
		</>
	);
}
