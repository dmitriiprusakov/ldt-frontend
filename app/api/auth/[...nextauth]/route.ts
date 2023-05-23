import { fetcher } from "core/fetcher";
import { User } from "core/types";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const NextAuthHandler = NextAuth({
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		// signIn: "/auth/signin",
		// signOut: '/auth/signout',
		// error: '/auth/error', // Error code passed in query string as ?error=
		// verifyRequest: '/auth/verify-request', // (used for check email message)
		// newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
	},
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "E-mail", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				try {
					const { data: token } = await fetcher.post<string>(
						"/api/signin",
						{
							email: credentials?.email,
							password: credentials?.password,
						}
					);

					if (!token) return null;

					const { data: user } = await fetcher.post<User>(
						"/api/me",
						{ token }
					);

					return user || null;
				} catch (error) {
					console.log("auth error=", error);

					return null;
				}
			},
		}),
	],
});

export { NextAuthHandler as GET, NextAuthHandler as POST };
