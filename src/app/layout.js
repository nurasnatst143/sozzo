import { Inter } from "next/font/google";
import "./globals.css";
import "swiper/css";

import "swiper/css/bundle";
import Providers from "@/components/nav/Providers";
import AuthProvider from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Sozoo Today",
	description: "Sozoo Today",
};

export default function RootLayout({ children }) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={inter.className}>
				<AuthProvider>
					<Providers>{children}</Providers>
				</AuthProvider>
			</body>
		</html>
	);
}
