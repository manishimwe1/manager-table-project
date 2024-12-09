import Sidebar from "@/components/Sidebar";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Hearder";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col md:flex-row min-h-screen w-full bg-background  dark:text-gray-800  ">
      <Sidebar />

      <Header />

      <NextTopLoader showSpinner={false} />
      <div className="flex flex-col h-full w-full px-2 lg:px-4 mt-16 md:ml-[162px] ">
        {children}
        <Toaster />
      </div>
    </main>
  );
}
