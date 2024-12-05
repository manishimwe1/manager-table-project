"use client";

import { navLink } from "@/lib/constant";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="space-y-3 md:w-40 mt-4 overflow-y-hidden sticky top-12 hidden lg:flex ">
      <div className="flex-1 w-full px-1">
        <ul className=" pb-4 space-y-4 text-sm  flex-col w-full">
          {navLink.map((link) => {
            const isActive = pathname === link.route;
            return (
              <Link
                key={link.label}
                href={link.route}
                className={cn(
                  "flex gap-1 w-full items-center px-2 py-2  rounded-md ",
                  isActive &&
                    "text-blue-400 underline decoration-2 underline-offset-4 shadow-sm shadow-black/50"
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
