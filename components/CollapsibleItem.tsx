"use client";

import { Id } from "@/convex/_generated/dataModel";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { ProductType, PurchaseType } from "@/types";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ChevronsDownUp, Loader2 } from "lucide-react";
import {
  calculateTotal,
  cn,
  formatReadableDate,
  getTranslatedDay,
  groupByDate,
} from "@/lib/utils";
import { useEffect, useState } from "react";
import DataComponents from "./DataComponents";
import { DataTable } from "./ibyaranguwe/DataTable";
import { columns } from "./ibyaranguwe/columns";
import { string } from "zod";

const CollapsibleItem = () => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [openState, setOpenState] = useState<{ [key: string]: boolean }>({}); // Track open state for each date
  const data: PurchaseType[] | undefined = useQuery(api.product.getProduct);
  const dataByDate: ProductType = useQuery(
    api.product.getProductByDate,
    selectedDate ? { date: selectedDate } : "skip" // Pass date only if available
  );

  console.log(dataByDate, "///////////");

  const groupedData = groupByDate(data);

  const handleToggle = (date: string) => {
    setOpenState((prev) => ({ ...prev, [date]: !prev[date] })); // Toggle state for the selected date
    setSelectedDate(Number(date)); // Set the selected date
  };

  if (data && data?.length <= 0)
    return <div className="text-center">No data found!</div>;

  console.log(dataByDate?.reduce((a, { uzishyuraAngahe: b }) => a + b, 0));

  return (
    <div>
      {/* Render unique dates */}
      {Object.entries(groupedData).map(([date, items]) => (
        <div key={date} className={cn("py-4 rounded-lg")}>
          <Collapsible>
            <CollapsibleTrigger
              className={cn(
                "flex items-center justify-between w-1/2 text-lg text-balance",
                openState[date] ? "text-blue-300" : "text-black" // Style based on state
              )}
              onClick={() => handleToggle(date)} // Toggle specific date's open state
            >
              Urutonde rw'ibyaranguwe {getTranslatedDay(date)}{" "}
              <ChevronsDownUp
                className={cn(
                  "text-gray-400 transition-transform",
                  openState[date]
                    ? "rotate-180 transition-all duration-200"
                    : "rotate-0" // Rotate the icon
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent
              className={cn(
                "flex flex-col  h-fit w-full ",
                openState[date]
                  ? "bg-blue-50/20 rounded-lg transition-all duration-200 "
                  : "rotate-0"
              )}
            >
              <div className="flex items-center gap-2 py-2  justify-end">
                <p className="items-center  font-bold pr-10 ">
                  Byose hamwe by'aranguwe:{" "}
                  <span className="text-lg ml-2 text-blue-800">
                    {items?.length}
                  </span>
                </p>
                <p className="items-center  font-bold pr-10">
                  Ideni ufite:{" "}
                  <span className="text-lg ml-2 text-red-300">
                    {data?.reduce((a, { uzishyuraAngahe: b }) => a + b, 0)}
                  </span>
                </p>
              </div>
              <ul>
                {/* <DataComponents dataByDate={items} /> */}
                <DataTable columns={columns} data={items} />
              </ul>
            </CollapsibleContent>
          </Collapsible>
        </div>
      ))}
    </div>
  );
};

export default CollapsibleItem;
