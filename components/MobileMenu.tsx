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
              <Link
                href={link.route}
                className={cn(
                  "flex gap-1 w-full items-center mr-3 ",
                  isActive &&
                    "text-blue-400 underline shadow-sm shadow-black/50 rounded-xl"
                )}
              >
                <SheetClose className="flex gap-1 items-center">
                  {link.Icon}
                  <p className={cn(isActive && "font-bold")}> {link.label}</p>
                </SheetClose>
              </Link>
            </div>
          );
        })}
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
