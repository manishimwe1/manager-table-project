import Sidebar from "@/components/Sidebar";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Hearder";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  return (
    <main className="flex flex-col md:flex-row min-h-screen w-full bg-background  dark:text-gray-800  ">
      <Sidebar />
      <div className="w-fit h-fit  left-3 top-5 shadow-sm shadow-black/20 px-1  fixed z-30">
        <Header />
      </div>

      <NextTopLoader showSpinner={false} />
      <div className="flex flex-col h-full w-full px-2 lg:px-4 mt-16 md:ml-[162px] ">
        {children}
        <Toaster />
      </div>
    </main>
  );
}
