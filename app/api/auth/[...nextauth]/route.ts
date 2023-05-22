import { User } from "core/types";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "E-mail", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				const loginResponse = await fetch("/api/login", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: credentials?.email,
						password: credentials?.password,
					}),
				});

				const token: string = await loginResponse.json();

				if (!token) return null;

				const meResponse = await fetch("/api/me", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ token }),
				});

				const user: User = await meResponse.json();

				if (user) return user;
				else return null;
			},
		}),
	],
};
export default NextAuth(authOptions);
