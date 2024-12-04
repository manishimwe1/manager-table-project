"use client";

import { Client } from "@/types";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ChevronsDownUp, Loader2 } from "lucide-react";
import {
  cn,
  getTranslatedDay,
  groupByDate,
  groupByDateInSaled,
} from "@/lib/utils";
import { useState } from "react";

import HeaderSection from "@/components/HeaderSection";
import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { DataTable } from "@/components/ibyagurishijwe/DataTable";
import { columns } from "@/components/ibyagurishijwe/columns";

const IbyagurishijwePage = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [openState, setOpenState] = useState<{ [key: string]: boolean }>({});

  // Fetch all products
  const saledProduct: Client[] | undefined = useQuery(
    api.clientName.getSaledProduct
  );
  const saledProductInDENI: Client[] | undefined = useQuery(
    api.clientName.getSaledProductInDeni
  );

  // Group products by date
  const groupedData = groupByDateInSaled(saledProduct);

  const handleToggle = (date: string) => {
    setOpenState((prev) => ({ ...prev, [date]: !prev[date] })); // Toggle open state
    setSelectedDate(date); // Set the selected date
  };

  return (
    <section className="w-full">
      <HeaderSection title="Urutonde rw'ibyacurujwe" />

      <div className="w-full h-full">
        {saledProduct ? (
          Object.entries(groupedData).map(([date, products]) => (
            <div key={date} className={cn("py-4 rounded-lg")}>
              <Collapsible open={!!openState[date]}>
                <CollapsibleTrigger
                  className={cn(
                    "flex items-center justify-between w-full text-lg text-balance border-b-2 border-blue-200 shadow-sm shadow-blue-200 py-2 px-3 rounded-xl",
                    openState[date] ? "text-blue-300" : "text-black"
                  )}
                  onClick={() => handleToggle(date)}
                >
                  {getTranslatedDay(date)}
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
                    "flex flex-col h-fit w-full",
                    openState[date]
                      ? "bg-blue-50/20 rounded-lg transition-all duration-200"
                      : "rotate-0"
                  )}
                >
                  <div className="flex items-center gap-2 py-2 justify-end">
                    <p className="font-bold pr-10">
                      Byose hamwe by'acurujwe uyu munsi:{" "}
                      <span className="text-lg ml-2 text-blue-800">
                        {products.length}
                      </span>
                    </p>
                    <p className="font-bold pr-10 capitalize">
                      Ideni bakurimo:{" "}
                      <span className="text-lg ml-2 text-red-300">
                        {saledProductInDENI ? (
                          saledProductInDENI.reduce(
                            (a, item) => a + (item?.yishyuyeAngahe || 0),
                            0
                          )
                        ) : (
                          <Loader2 className="animate-spin" />
                        )}
                      </span>
                    </p>
                  </div>
                  <ul>
                    <DataTable columns={columns} data={products} />
                  </ul>
                </CollapsibleContent>
              </Collapsible>
            </div>
          ))
        ) : (
          <Loader2 className="animate-spin" />
        )}
      </div>
    </section>
  );
};

export default IbyagurishijwePage;
