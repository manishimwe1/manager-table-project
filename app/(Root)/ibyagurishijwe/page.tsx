"use client";

import { Client, ProductType } from "@/types";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  ChevronsDownUp,
  Filter,
  Loader2,
  LucideListFilter,
} from "lucide-react";
import {
  cn,
  getTranslatedDay,
  groupByDate,
  groupByDateInSaled,
} from "@/lib/utils";
import { useEffect, useState, useMemo } from "react";

import HeaderSection from "@/components/HeaderSection";
import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { DataTable } from "@/components/ibyagurishijwe/DataTable";
import { columns } from "@/components/ibyagurishijwe/columns";
import EmptyPlaceholder from "@/components/EmptyPlaceholder";
import { useSession } from "next-auth/react";
import { Id } from "@/convex/_generated/dataModel";
import SkeletonLoader from "@/components/SkeletonLoader";
import { redirect } from "next/navigation";
import SearchBox from "@/components/SearchBox";

const IbyagurishijwePage = () => {
  const [openState, setOpenState] = useState<{ [key: string]: boolean }>({});
  const [searchValue, setSearchValue] = useState("");
  const session = useSession();
  const userId = session.data?.user;

  const handleCollapsibleClick = (date: string) => {
    setOpenState((prev) => ({
      ...prev,
      [date]: !prev[date],
    }));
  };

  const user = useQuery(api.user.getUserIndb, { email: userId?.email || "" });
  const saledProduct = useQuery(api.clientName.getSaledProduct, {
    userId: user?._id as Id<"user">,
  });

  if (session.status === "loading") return <SkeletonLoader />;

  if (!saledProduct) {
    return (
      <EmptyPlaceholder
        title="Ntagicuruzwa uracuruza uyumunsi"
        link="/curuza"
        label="Curuza"
      />
    );
  }

  // First group the data by date
  const groupedData = groupByDateInSaled(saledProduct);

  // Then filter the items within each group based on search
  const filteredGroupedData = Object.entries(groupedData).reduce(
    (acc, [date, items]) => {
      const filteredItems = searchValue
        ? items.filter(
            (item) =>
              item.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
              item.igicuruzwa?.toLowerCase().includes(searchValue.toLowerCase())
          )
        : items;

      // Only include dates that have matching items
      if (filteredItems.length >= 0) {
        acc[date] = filteredItems;
      }
      return acc;
    },
    {} as typeof groupedData
  );

  console.log(filteredGroupedData, "filteredGroupedData");

  return (
    <section className="w-full">
      <HeaderSection title="Urutonde rw'ibyacurujwe" />
      <div className="w-full h-full space-y-2">
        {Object.entries(filteredGroupedData).map(([date, items]) => (
          <div key={date} className={cn("py-4 rounded-lg")}>
            <Collapsible open={openState[date]}>
              <CollapsibleTrigger
                onClick={() => handleCollapsibleClick(date)}
                className={cn(
                  "flex items-center justify-between w-full text-lg border-b-2 border-blue-200 dark:border-stone-700 shadow-sm text-gray-800 dark:text-gray-200 shadow-background py-2 px-3 rounded-xl bg-background dark:shadow-black/70",
                  openState[date] ? "text-blue-300" : "text-black"
                )}
              >
                Urutonde rw'ibyacurujwe {getTranslatedDay(date)}
                <div className="lg:flex items-center justify-end lg:gap-3 gap-1 hidden">
                  {/* <p className="font-semibold text-gray-800 dark:text-gray-50 italic text-xs uppercase flex justify-end items-center gap-1">
                  Ideni ufitemo:{" "}
                  <span className="text-lg ml-2 text-red-300">
                    {items
                      ?.reduce((a, item) => a + (item.ay || 0), 0)
                      .toLocaleString()}
                  </span>{" "}
                  Rwf
                </p> */}
                  <ChevronsDownUp
                    className={cn(
                      "text-gray-800 dark:text-gray-200 transition-transform",
                      openState[date]
                        ? "rotate-180 transition-all duration-200"
                        : "rotate-0"
                    )}
                  />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent
                className={cn(
                  "flex flex-col h-fit w-full mt-2 lg:mt-4",
                  openState[date]
                    ? "bg-blue-50/20 dark:bg-stone-900 rounded-lg transition-all duration-200"
                    : ""
                )}
              >
                <div className="flex items-center justify-between w-full flex-col py-2 px-4">
                  <div className="flex items-center justify-end gap-4 w-full">
                    <div className="w-full lg:w-1/2">
                      <SearchBox
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                      />
                    </div>
                    <div>
                      <LucideListFilter className="text-gray-600 dark:text-gray-300" />
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row justify-between items-start w-full gap-2 mt-4">
                    <p className="text-black dark:text-gray-200 text-nowrap lg:text-sm text-sm">
                      Byose hamwe: {items?.length}
                    </p>
                    <p className="text-stone-900 dark:text-gray-200 text-nowrap lg:text-sm text-xs">
                      Total yacurujwe uyu munsi:{" "}
                      <span className="text-blue-800 text-base font-bold">
                        {items
                          ?.reduce(
                            (acc, item) =>
                              acc + item.ukoNyigurisha! * item.aratwaraZingahe,
                            0
                          )
                          .toLocaleString()}{" "}
                        rwf
                      </span>
                    </p>
                    <p className="text-stone-900 dark:text-gray-200 text-nowrap lg:text-sm text-xs">
                      Total yamadeni uyu munsi:{" "}
                      <span className="text-red-500 text-base font-bold">
                        {items
                          ?.reduce(
                            (acc, item) =>
                              !item.yishyuye
                                ? acc +
                                  item.ukoNyigurisha! * item.aratwaraZingahe
                                : acc,
                            0
                          )
                          .toLocaleString()}{" "}
                        rwf
                      </span>
                    </p>
                    <p className="text-stone-900 dark:text-gray-200 text-nowrap lg:text-sm text-xs">
                      Total y'ishyuwe uyu munsi:{" "}
                      <span className="text-green-500 text-base font-bold">
                        {items
                          ?.reduce(
                            (acc, item) =>
                              item.yishyuye
                                ? acc +
                                  item.ukoNyigurisha! * item.aratwaraZingahe
                                : acc,
                            0
                          )
                          .toLocaleString()}{" "}
                        rwf
                      </span>
                    </p>
                  </div>
                </div>
                <ul>
                  <DataTable columns={columns} data={items || []} />
                </ul>
              </CollapsibleContent>
            </Collapsible>
          </div>
        ))}
        {/* <ul>
            <DataTable columns={columns} data={filteredData || []} />
          </ul> */}
      </div>
    </section>
  );
};

export default IbyagurishijwePage;
