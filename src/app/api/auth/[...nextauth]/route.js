import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import User from "../../../../../models/user.js";
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
				const email = credentials.email.toLowerCase();
				const password = credentials.password;

				if (!email || !password) {
					throw new Error("Email and password are required.");
				}

				try {
					await connectDB();

					const retriveUser = await User.findOne({ email: email });

					if (!retriveUser) return null;

					const isMatch = await bcrypt.compare(password, retriveUser.password);

					if (!isMatch) return null;

					return {
						id: retriveUser._id.toString(),
						name: retriveUser.name,
						email: retriveUser.email,
						username: retriveUser.username,
						role: retriveUser.role,
						points: retriveUser.points,
					};
				} catch (error) {
					console.log("hiterr");
					console.error("Authorize error:", error);
					return null;
				}
			},
		}),
	],

	callbacks: {
		signIn: async ({ user, account, profile }) => {
			if (account.provider === "google") {
				await connectDB();
				const existingUser = await User.findOne({ email: user.email });

				if (!existingUser) {
					// Create new user if not found
					const username =
						user.name?.split(" ")[0].toLowerCase() +
						Math.floor(Math.random() * 1000);
					const newUser = await User.create({
						authProvider: "google",
						googleId: account.providerAccountId,
						email: user.email,
						name: user.name,
						username,
						image: user.image,
						emailVerified: true,
						role: "user",
						points: 100,
					});

					// Enrich `user` object
					user.id = newUser._id.toString();
					user.username = newUser.username;
					user.role = newUser.role;
					user.points = newUser.points;
				} else {
					user.id = existingUser._id.toString();
					user.username = existingUser.username;
					user.role = existingUser.role;
					user.points = existingUser.points;
					user.image = existingUser.image;
				}
			}

			return true; // Important: allows login to continue
		},

		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.name = user.name;
				token.email = user.email;
				token.username = user.username;
				token.role = user.role;
				token.image = user.image;
				token.points = user.points;
			}
			return token;
		},

		async session({ session, token }) {
			if (token) {
				session.user = {
					id: token.id,
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
