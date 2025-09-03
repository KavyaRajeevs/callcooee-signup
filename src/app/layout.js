import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Cooee Signup",
    description: "Virtual number signup flow",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="h-full">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased h-full bg-gray-900 text-white`}
        >
        <div className="min-h-screen flex flex-col">{children}</div>
        </body>
        </html>
    );
}
