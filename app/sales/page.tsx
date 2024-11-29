"use client";

import { Id } from "@/convex/_generated/dataModel";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ProductType } from "@/types";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2 } from "lucide-react";
import {
  cn,
  formatReadableDate,
  formatToday,
  getTranslatedDay,
  groupByDate,
} from "@/lib/utils";
import { useEffect, useState } from "react";
import DataComponents from "@/components/DataComponents";
import CollapsibleComponents from "@/components/collapsibleComponents";

const SalesPage = () => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const data: ProductType = useQuery(api.product.getProduct);
  const dataByDate: ProductType = useQuery(
    api.product.getProductByDate,
    selectedDate ? { date: selectedDate } : "skip" // Pass date only if available
  );
  const today = new Date();

  const groupedData = groupByDate(data);

  if (data && data?.length <= 0)
    return <div className="text-center">No data found!</div>;

  return (
    <section className="flex flex-col w-full h-full ">
      {/* Render unique dates */}
      {data ? (
        <CollapsibleComponents
          title={`Urutonde rw'ibicuruzwa kuwa ${getTranslatedDay(formatToday())}`}
        >
          <p className="w-full text-sm flex justify-end items-center text-blue-700 font-bold pr-10">
            Number of items:{" "}
            <span className="text-lg ml-2">{data?.length}</span>
          </p>
          <div>
            <DataComponents dataByDate={data} />
          </div>
        </CollapsibleComponents>
      ) : (
        <Loader2 className="animate-spin" />
      )}
    </section>
  );
};

export default SalesPage;
