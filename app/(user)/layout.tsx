import type { Metadata } from "next";
import "@/app/globals.css";
import {
	Poppins,
	Gothic_A1,
	Inconsolata,
	Josefin_Sans,
} from "next/font/google";
import BaseLayout from "@/components/BaseLayout";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
	subsets: ["latin"],
	variable: "--font-poppins",
	display: "swap",
	weight: "400",
});

const gothic = Gothic_A1({
	subsets: ["latin"],
	variable: "--font-gothic",
	display: "swap",
	weight: "400",
});

const inconsolata = Inconsolata({
	subsets: ["latin"],
	variable: "--font-inconsolata",
	display: "swap",
	weight: ["400", "500", "600", "700"],
});

const josefin = Josefin_Sans({
	subsets: ["latin"],
	variable: "--font-josefin",
	display: "swap",
	weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`${poppins.variable} ${gothic.variable} ${inconsolata.variable} ${josefin.variable} antialiased`}>
				<BaseLayout>
					{children}
					<Toaster
						position='bottom-center'
						reverseOrder={false}
					/>
				</BaseLayout>
			</body>
		</html>
	);
}
