"use client";

import { Client, ProductType } from "@/types";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ChevronsDownUp, Loader2 } from "lucide-react";
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

  const user = useQuery(api.user.getUserIndb, { email: userId?.email || "" });
  const saledProduct = useQuery(api.clientName.getSaledProduct, {
    userId: user?._id as Id<"user">,
  });

  const filteredData = useMemo(() => {
    if (!searchValue) return saledProduct;
    return saledProduct?.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, saledProduct]);

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
  const groupedData = groupByDateInSaled(filteredData);
  return (
    <section className="w-full">
      <HeaderSection title="Urutonde rw'ibyacurujwe" />
      <div className="w-full h-full space-y-2">
        {Object.entries(groupedData).map(([date, items]) => (
          <div key={date} className={cn("py-4 rounded-lg")}>
            <Collapsible>
              <CollapsibleTrigger
                className={cn(
                  "flex items-center justify-between w-full text-lg border-b-2 border-blue-200 dark:border-stone-700 shadow-sm text-gray-800 dark:text-gray-200 shadow-background py-2 px-3 rounded-xl bg-background  dark:shadow-black/70",
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
                    ? "bg-blue-50/20 dark:bg-stone-900 rounded-lg transition-all duration-200 "
                    : "rotate-0"
                )}
              >
                <div className="flex items-center justify-between w-full flex-row-reverse lg:flex-row py-2 px-4">
                  <div className="flex justify-between items-center">
                    <p className="text-blue-400 text-nowrap lg:text-base text-sm ">
                      Byose hamwe: {items?.length}
                    </p>
                    <p className="text-stone-900 dark:text-gray-200 text-nowrap lg:text-base text-sm ">
                      Total yacurujwe uyu munsi:{" "}
                      <span className="text-blue-800">
                        {items
                          ?.reduce(
                            (acc, item) =>
                              acc + item.ukoNyigurisha! * item.aratwaraZingahe,
                            0
                          )
                          .toLocaleString()}
                      </span>
                    </p>
                  </div>
                  <div className="lg:w-[600px] w-full">
                    <SearchBox
                      searchValue={searchValue}
                      setSearchValue={setSearchValue}
                    />
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
