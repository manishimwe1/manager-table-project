"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { ProductType } from "@/types";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ChevronsDownUp } from "lucide-react";
import { cn, getTranslatedDay, groupByDate } from "@/lib/utils";
import { useState } from "react";
import { DataTable } from "./ibyaranguwe/DataTable";
import { columns } from "./ibyaranguwe/columns";
import EmptyPlaceholder from "./EmptyPlaceholder";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import SkeletonLoader from "./SkeletonLoader";

const CollapsibleItem = ({ className }: { className?: string }) => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [openState, setOpenState] = useState<{ [key: string]: boolean }>({});

  const session = useSession();
  const userId = session.data?.user;

  // Ensure hooks are called unconditionally
  const user = useQuery(
    api.user.getUserIndb,
    userId?.email ? { email: userId.email } : "skip"
  );
  const data: ProductType[] | undefined = useQuery(
    api.product.getProduct,
    user?._id ? { userId: user._id } : "skip"
  );
  const dataByDate: ProductType[] | undefined = useQuery(
    api.product.getProductByDate,
    { date: selectedDate || 0 }
  );

  if (session.status === "loading") {
    return (
      <div>
        <SkeletonLoader />
      </div>
    );
  }

  if (!userId) {
    redirect("/login");
    return <div>Redirecting...</div>;
  }

  const groupedData = groupByDate(data);

  const handleToggle = (date: string) => {
    setOpenState((prev) => ({ ...prev, [date]: !prev[date] }));
    setSelectedDate(Number(date));
  };

  if (!data) {
    return (
      <div className="flex w-full flex-col gap-4">{/* Render skeletons */}</div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="h-full w-full">
        <EmptyPlaceholder
          title="Ntabicuruzwa ufite muri stock"
          label="Rangura"
          link="/rangura"
        />
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      {Object.entries(groupedData).map(([date, items]) => (
        <div key={date} className={cn("py-4 rounded-lg")}>
          <Collapsible>
            <CollapsibleTrigger
              className={cn(
                "flex items-center justify-between w-full text-lg border-b-2 border-blue-200 dark:border-stone-700 shadow-sm text-gray-800 dark:text-gray-200 shadow-background py-2 px-3 rounded-xl bg-background  dark:shadow-black/70",
                className ? className : "w-full ",
                openState[date] ? "text-blue-300" : "text-black"
              )}
              onClick={() => handleToggle(date)}
            >
              Urutonde rw'ibyaranguwe {getTranslatedDay(date)}
              <div className="lg:flex items-center justify-end lg:gap-3 gap-1 hidden">
                <p className="font-semibold text-gray-800 dark:text-gray-50 italic text-xs uppercase flex justify-end items-center gap-1">
                  Ideni ufitemo:{" "}
                  <span className="text-lg ml-2 text-red-300">
                    {items
                      ?.reduce((a, item) => a + (item.uzishyuraAngahe || 0), 0)
                      .toLocaleString()}
                  </span>{" "}
                  Rwf
                </p>
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
              <div className="flex items-center gap-2  justify-center lg:justify-end px-4 ">
                <p className="lg:font-bold pr-10 text-nowrap text-xs lg:text-sm dark:text-gray-200">
                  Byose hamwe by'aranguwe:{" "}
                  <span className="text-lg ml-2 text-blue-800">
                    {items?.length}
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
