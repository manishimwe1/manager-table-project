"use client";

import { Id } from "@/convex/_generated/dataModel";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { ProductType } from "@/types";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ChevronsDownUp, Loader2 } from "lucide-react";
import { cn, formatReadableDate, groupByDate } from "@/lib/utils";
import { useEffect, useState } from "react";
import DataComponents from "./DataComponents";

const CollapsibleItem = () => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const data: ProductType = useQuery(api.product.getProduct);
  const dataByDate: ProductType = useQuery(
    api.product.getProductByDate,
    selectedDate ? { date: selectedDate } : "skip" // Pass date only if available
  );
  const groupedData = groupByDate(data);

  const handleDateSelection = (date: number) => {
    setSelectedDate(date); // Set the selected date
  };

  if (data && data?.length <= 0)
    return <div className="text-center">No data found!</div>;

  return (
    <div>
      {/* Render unique dates */}
      {Object.entries(groupedData).map(([date, items]) => (
        <div key={date} className={cn(" py-4 rounded-lg")}>
          <Collapsible>
            <CollapsibleTrigger
              className="flex items-center justify-between w-1/2 text-lg text-balance"
              onClick={() => handleDateSelection(Number(date))}
            >
              Urutonde rw'ibyaranguwe kuri {date} <ChevronsDownUp />
            </CollapsibleTrigger>
            <CollapsibleContent className="flex flex-col bg-blue-50/20 rounded-lg h-screen w-full">
              <p className="w-full text-sm flex justify-end items-center text-blue-700 font-bold pr-10">
                Number of items:{" "}
                <span className="text-lg ml-2">{items?.length}</span>
              </p>
              <ul>
                <DataComponents dataByDate={items} />
              </ul>
            </CollapsibleContent>
          </Collapsible>
        </div>
      ))}
    </div>
  );
};

export default CollapsibleItem;
