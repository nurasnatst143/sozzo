import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import User from "../../../../../models/user";
import bcrypt from "bcryptjs";
import connectDB from "../../../../../config/connectDB";

export const authOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
			clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
		}),

		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				const { email, password } = credentials;

				if (!email || !password) {
					throw new Error("Email and password are required.");
				}

				try {
					await connectDB();

					const retriveUser = await User.findOne({ email });

					if (!retriveUser) {
						return null;
					}

					const passMatch = await bcrypt.compare(
						password,
						retriveUser.password
					);
					if (!passMatch) {
						return null;
					}

					const user = {
						id: retriveUser._id.toString(),
						username: retriveUser.username,
						name: retriveUser.name,
						email: retriveUser.email,
						role: retriveUser.role,
						points: retriveUser.points,
					};
					return user;
				} catch (error) {
					console.error("Authorization error:", error);
					return null;
				}
			},
		}),
	],

	callbacks: {
		async signIn({ user, account, profile }) {
			await connectDB();

			if (account.provider === "google") {
				const existingUser = await User.findOne({ email: user.email });

				if (!existingUser) {
					// Create new user based on your schema
					await User.create({
						authProvider: "google",
						googleId: account.providerAccountId,
						email: user.email,
						emailVerified: true,
						name: user.name,
						image: user.image,
						points: 100,
					});
				}
			}

			return true; // Allow sign in
		},

		async jwt({ token, user, account, profile }) {
			if (user) {
				token.name = user.name || profile?.name;
				token.email = user.email || profile?.email;
				token.username = user.username || profile?.given_name;
				token.role = user.role || "user";
				token.points = user.points || 0;
				token.image = user.image || profile?.picture;
			}
			return token;
		},

		async session({ session, token }) {
			if (token) {
				session.user = {
					...session.user,
					name: token.name,
					email: token.email,
					username: token.username,
					role: token.role,
					image: token.image,
					points: token.points,
				};
			}
			return session;
		},
	},

	session: {
		strategy: "jwt",
	},

	secret: process.env.NEXTAUTH_SECRET,

	pages: {
		signIn: "/login",
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
