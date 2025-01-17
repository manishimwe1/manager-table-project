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
import { useEffect, useState } from "react";

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
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const session = useSession();
  const userId = session.data?.user;

  // Always call hooks consistently
  const user = useQuery(api.user.getUserIndb, { email: userId?.email || "" });

  const saledProduct = useQuery(api.clientName.getSaledProduct, {
    userId: user?._id as Id<"user">,
  });

  useEffect(() => {
    if (!userId) {
      redirect("/login");
    }
  }, [userId]);

  if (session.status === "loading") return <SkeletonLoader />;

  const groupedData = groupByDateInSaled(saledProduct || []);


  if (saledProduct?.length === 0) {
    return (
      <EmptyPlaceholder
        title="Ntagicuruzwa uracuruza uyumunsi"
        link="/curuza"
        label="Curuza"
      />
    );
  }
  return (
    <section className="w-full">
      <HeaderSection title="Urutonde rw'ibyacurujwe" />
      <div className="w-full h-full space-y-2">
        {Object.entries(groupedData).map(([date, items]) => (
          <div key={date} className={cn("py-4 rounded-lg")}><div className=" flex items-center justify-between  w-full flex-row-reverse lg:flex-row">
            <p className="text-blue-400 text-nowrap lg:text-base text-sm ">
              Yose hamwe: {items?.length}
            </p>
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
          </div>
        ))}
      </div>
    </section>
  );
};

export default IbyagurishijwePage;
