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
					console.log("hit3", email, password, retriveUser);
					if (!retriveUser) {
						return null;
					}

					const passMatch = await bcrypt.compare(
						password,
						retriveUser.password
					);
					if (!passMatch) {
						throw new Error("Email or password wrong");
						return null;
					}

					const user = {
						id: retriveUser._id,
						name: retriveUser.name,
						email: retriveUser.email,
						role: retriveUser.role,
					};
					return user;
				} catch (error) {
					console.log("err", error);
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.name = user.name;
				token.email = user.email;
				token.role = user.role;
				token.image = user.image;
			}
			return token;
		},

		async session({ session, token }) {
			if (token) {
				session.user = {
					...session.user,
					role: token.role,
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
