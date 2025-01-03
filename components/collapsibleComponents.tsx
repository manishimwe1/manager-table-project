import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { ChevronsDownUp } from "lucide-react";
import { useState } from "react";

interface CollapsibleItemProps {
  title: string;
  subtitle?: string;
  dataLength?: number;
  children: React.ReactNode;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  isOpen?: boolean;
}

const CollapsibleComponents = ({
  title,
  subtitle,
  dataLength,
  children,
  setIsOpen,
  isOpen,
}: CollapsibleItemProps) => {
  return (
    <div className={cn("py-4 rounded-lg w-full")}>
      <Collapsible>
        <CollapsibleTrigger
          className={cn(
            "flex items-center justify-between w-full text-lg text-balance border-b-2 border-blue-200 dark:border-stone-700 shadow-sm text-gray-800 dark:text-gray-200 shadow-background py-2 px-3 rounded-xl bg-background  dark:shadow-black/70"
          )}
          onClick={() => {
            setIsOpen && setIsOpen(!isOpen);
          }}
        >
          {title}
          <ChevronsDownUp
            className={cn(
              "text-gray-800 dark:text-gray-200 transition-transform"
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col rounded-lg mt-4">
          {subtitle && (
            <p className="w-full text-sm flex justify-end items-center text-blue-700 font-bold pr-10">
              {subtitle}:{" "}
              <span className="text-lg ml-2 text-gray-800 dark:text-gray-200">
                {dataLength || 0}
              </span>
            </p>
          )}
          <div>{children}</div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default CollapsibleComponents;
