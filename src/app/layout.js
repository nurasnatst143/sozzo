import { Inter } from "next/font/google";
import "./globals.css";
import "swiper/css";

import "swiper/css/bundle";
import Providers from "@/components/nav/Providers";
import AuthProvider from "@/components/AuthProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Sozoo Today",
	description: "Sozoo Today",
};

export default async function RootLayout({ children }) {
	const session = await getServerSession(authOptions);

	return (
		<html lang='en' suppressHydrationWarning>
			<body className={inter.className}>
				<AuthProvider session={session}>
					<Providers>{children}</Providers>
				</AuthProvider>
			</body>
		</html>
	);
}
