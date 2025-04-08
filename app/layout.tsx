import type { Metadata } from "next";
import {Mona_Sans} from "next/font/google";
import "./globals.css";

const monaSans = Mona_Sans({
  variable: "--font-mono-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prepview",
  description: "An AI-Powered tool to help you with mock interviews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${monaSans.variable} antialiased pattern`}
      >
        {children}
      </body>
    </html>
  );
}
