"use client";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLink } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DialogTitle } from "./ui/dialog";

const MobileMenu = () => {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon />
      </SheetTrigger>
      <SheetContent side={"left"} className="space-y-3">
        <DialogTitle></DialogTitle>
        {navLink.map((link) => {
          const isActive = pathname === link.route;
          return (
            <div className="flex flex-col gap-2 mr-3 " key={link.label}>
              <SheetClose asChild>
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
              </SheetClose>
            </div>
          );
        })}
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
