"use client";

import { navLink } from "@/lib/constant";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Header from "./Hearder";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="space-y-3 md:w-40  overflow-y-hidden sticky top-0 hidden lg:flex shadow-md dark:shadow-gray-800 shadow-gray-200 min-h-screen pt-6">
      <div className="flex-1 w-full px-1">
        <ul className=" pb-4 space-y-4 text-sm  flex-col w-full">
          {navLink.map((link) => {
            const isActive = pathname === link.route;
            return (
              <Link
                key={link.label}
                href={link.route}
                className={cn(
                  "flex gap-1 w-full items-center px-2 py-2  rounded-md text-gray-800 dark:text-gray-200",
                  isActive &&
                    "text-blue-400 underline  dark:text-gray-200decoration-2 underline-offset-4 shadow-sm shadow-black/50 dark:bg-gray-800"
                )}
              >
                {link.Icon}
                <p className={cn(isActive && "font-bold w-full")}>
                  {" "}
                  {link.label}
                </p>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
