import type { Metadata } from "next";
import { Manrope } from "next/font/google"
import "./globals.css";

const manrope = Manrope({
	variable: "--font-manrope",
	subsets: ["latin"],
	display: "swap",
	weight: ["400", "500", "600", "800"]
})

export const metadata: Metadata = {
	title: "Pathfinder",
	description: "Find Your Ideal Career and Academic Path",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
	return (
		<html lang="en" className={manrope.variable}>
			<body className={`antialiased`}>
				{children}
			</body>
		</html>
	);
}
