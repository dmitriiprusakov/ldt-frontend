import { User } from "core/types";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const NextAuthHandler = NextAuth({
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "E-mail", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				const loginResponse = await fetch("http://localhost:3000/api/signin", {
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

				const meResponse = await fetch("http://localhost:3000/api/me", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ token }),
				});

				const user: User = await meResponse.json();

				return user || null;
			},
		}),
	],
});

export { NextAuthHandler as GET, NextAuthHandler as POST };
