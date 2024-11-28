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
import { Loader2 } from "lucide-react";
import { formatReadableDate, groupByDate } from "@/lib/utils";
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
  return (
    <div>
      {/* Render unique dates */}
      {Object.entries(groupedData).map(([date, items]) => (
        <div key={date} className="border py-4">
          <Collapsible>
            <CollapsibleTrigger
              onClick={() => handleDateSelection(Number(date))}
            >
              {date}
            </CollapsibleTrigger>
            <CollapsibleContent>
              <p>Number of items: {items?.length}</p>
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
