"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { ProductType, PurchaseType } from "@/types";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ChevronsDownUp } from "lucide-react";
import { cn, getTranslatedDay, groupByDate } from "@/lib/utils";
import { useState } from "react";
import { DataTable } from "./ibyaranguwe/DataTable";
import { columns } from "./ibyaranguwe/columns";
import { Skeleton } from "./ui/skeleton";

const CollapsibleItem = ({ className }: { className?: string }) => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [openState, setOpenState] = useState<{ [key: string]: boolean }>({});

  // Fetch all products
  const data: PurchaseType[] | undefined = useQuery(api.product.getProduct);

  // Fetch products by selected date
  const dataByDate: PurchaseType[] | undefined = useQuery(
    api.product.getProductByDate,
    selectedDate ? { date: selectedDate } : "skip"
  );

  const groupedData = groupByDate(data);

  const handleToggle = (date: string) => {
    setOpenState((prev) => ({ ...prev, [date]: !prev[date] })); // Toggle open state
    setSelectedDate(Number(date)); // Set the selected date
  };

  if (!data || data.length === 0) {
    return (
      <div className="flex w-full flex-col gap-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4  w-full ">
          <Skeleton className="w-full h-[100px] rounded-md" />
          <Skeleton className="w-full h-[100px] rounded-md" />
          <Skeleton className="w-full h-[100px] rounded-md" />
          <Skeleton className="w-full h-[100px] rounded-md" />
        </div>
        <div className="flex gap-3 items-center">
          <Skeleton className="w-1/2 h-[30px] rounded-md" />
          <Skeleton className="w-1/2 h-[30px] rounded-md" />
        </div>
        <div className="flex flex-col gap-3 items-center">
          <Skeleton className="w-1/2 h-[30px] rounded-md" />
          <Skeleton className="w-1/2 h-[30px] rounded-md" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full ">
      {Object.entries(groupedData).map(([date, items]) => (
        <div key={date} className={cn("py-4 rounded-lg")}>
          <Collapsible>
            <CollapsibleTrigger
              className={cn(
                "flex items-center justify-between w-full text-lg text-balance border-b-2 border-blue-200 shadow-sm shadow-blue-200 py-2 px-3 rounded-xl",
                className ? className : "lg:w-1/2 ",
                openState[date] ? "text-blue-300" : "text-black"
              )}
              onClick={() => handleToggle(date)}
            >
              Urutonde rw'ibyaranguwe {getTranslatedDay(date)}
              <ChevronsDownUp
                className={cn(
                  "text-gray-400 transition-transform",
                  openState[date]
                    ? "rotate-180 transition-all duration-200"
                    : "rotate-0"
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent
              className={cn(
                "flex flex-col h-fit w-full ",
                openState[date]
                  ? "bg-blue-50/20 rounded-lg transition-all duration-200 "
                  : "rotate-0"
              )}
            >
              <div className="flex items-center gap-2 py-2 justify-end">
                <p className="font-bold pr-10">
                  Byose hamwe by'aranguwe:{" "}
                  <span className="text-lg ml-2 text-blue-800">
                    {items?.length}
                  </span>
                </p>
                <p className="font-bold pr-10">
                  Ideni ufite:{" "}
                  <span className="text-lg ml-2 text-red-300">
                    {items?.reduce(
                      (a, item) => a + (item.uzishyuraAngahe || 0),
                      0
                    )}
                  </span>
                </p>
              </div>
              <ul>
                <DataTable columns={columns} data={items || []} />
              </ul>
            </CollapsibleContent>
          </Collapsible>
        </div>
      ))}
    </div>
  );
};

export default CollapsibleItem;
