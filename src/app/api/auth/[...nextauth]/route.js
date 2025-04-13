import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../../../models/user";
import bcrypt from "bcryptjs";
import connectDB from "../../../../../config/connectDB";

export const authOptions = {
	providers: [
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
		async jwt({ token, user }) {
			if (user) {
				token.name = user.name;
				token.email = user.email;
				token.username = user.username;
				token.role = user.role;
				token.points = user.points;
				token.image = user.image;
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
		signIn: "/admin/login",
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
