import type { Metadata } from "next";
import { Newsreader, Inter } from "next/font/google";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Juris Pro | The Editorial Juris",
  description: "Premium Legal Workspace — The Digital Barrister",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-surface text-on-surface font-body">
        <Sidebar />
        <main className="ml-64 min-h-screen">
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
