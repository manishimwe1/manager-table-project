import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";
import Sidebar from "@/components/Sidebar";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";
import MobileMenu from "@/components/MobileMenu";
import Header from "@/components/Hearder";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Stock Management System - Simplify Inventory Control",
  description:
    "A modern and efficient system for managing stock and inventory with ease. Developed by emino.dev.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex h-full w-full scroll-smooth relative transition-all duration-200 ease-in-out`}
      >
        <div className="md:flex flex-col min-h-screen px-2  w-fit bg-background  dark:text-gray-800 hidden z-50">
          <Sidebar />
        </div>
        <div className="w-fit h-fit  left-3 top-5 shadow-sm shadow-black/20 px-1  fixed z-30">
          <Header />
        </div>
        <div className="flex items-start mt-20 flex-col justify-center w-full min-h-screen ">
          <ConvexClientProvider>
            {" "}
            <NextTopLoader showSpinner={false} />
            <div className="flex flex-col h-full w-full  ">
              {children}
              <Toaster />
            </div>
          </ConvexClientProvider>
        </div>
      </body>
    </html>
  );
}
