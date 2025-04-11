import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '../../../../../models/user';
import bcrypt from 'bcryptjs';
import connectDB from '../../../../../config/connectDB';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;
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
            id: retriveUser._id,
            name: retriveUser.name,
            email: retriveUser.email,
            role: retriveUser.role,
          };
          return user;
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      await connectDB();
      const user = await User.findOne({ email: session.user.email });
      session.user.role = user.role;
      session.user.id = user._id;
      session.user.image = user.image
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
