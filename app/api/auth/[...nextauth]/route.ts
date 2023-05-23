import { axiosInst } from "core/axios";
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
				try {
					const { data: token } = await axiosInst.post<string>(
						"/api/signin",
						{
							email: credentials?.email,
							password: credentials?.password,
						}
					);

					if (!token) return null;

					const { data: user } = await axiosInst.post<User>(
						"/api/me",
						{ token }
					);

					return user || null;
				} catch (error) {
					console.log(error);

					return null;
				}
			},
		}),
	],
});

export { NextAuthHandler as GET, NextAuthHandler as POST };
