"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, User2 } from "lucide-react";
import { cn } from "@/lib/utils";
import MobileMenu from "./MobileMenu";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import UserButton from "./UserButton";
import { Button } from "./ui/button";

const Header = () => {
  const session = useSession();
  const user = session.data?.user;
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    setDarkMode(theme === "dark");
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);

  // Handle dark mode toggle
  const toggleDarkMode = () => {
    const newTheme = darkMode ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", !darkMode);
    setDarkMode(!darkMode);
  };
  console.log(session.status);

  return (
    <header
      className={cn(
        "fixed top-0 w-full bg-background dark:bg-black/90 shadow-sm shadow-gray-200 dark:shadow-gray-900",
        "flex items-center justify-between px-4 py-2 inset-x-0 z-50 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0 "
      )}
    >
      {/* Brand Logo */}
      <Link
        href="/"
        className="text-lg font-bold text-gray-800 dark:text-gray-200 lg:pl-4"
      >
        Stock Manager
      </Link>

      {/* Actions: Dark Mode Toggle + Mobile Menu */}
      <div className="flex items-center gap-4 px-3">
        {user ? (
          <UserButton user={user} />
        ) : session.status === "unauthenticated" ? (
          <Button
            asChild
            className=" bg-background dark:text-gray-200 hover:bg-gray-600"
          >
            <Link href={"/login"}>Sign In</Link>
          </Button>
        ) : (
          <Skeleton className="border h-6 w-6 " />
        )}
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          aria-label="Toggle Dark Mode"
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          {darkMode ? (
            <Sun className="w-4 h-4 text-yellow-400" />
          ) : (
            <Moon className="w-4 h-4 text-gray-800" />
          )}
        </button>

        {/* Mobile Menu Trigger */}
        <div className="lg:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
