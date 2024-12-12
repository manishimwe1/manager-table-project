"use client";

import EmptyPlaceholder from "@/components/EmptyPlaceholder";
import HeaderSection from "@/components/HeaderSection";
import { columns } from "@/components/ibyaranguwe/columns";
import { DataTable } from "@/components/ibyaranguwe/DataTable";
import SearchBox from "@/components/SearchBox";
import SkeletonLoader from "@/components/SkeletonLoader";
import { api } from "@/convex/_generated/api";
import { ProductType, PurchaseType } from "@/types";
import { useQuery } from "convex/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useMemo, useState, useEffect } from "react";

const StockPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const session = useSession();
  const userId = session.data?.user;

  // Move conditional routing logic before hooks
  useEffect(() => {
    if (session.status !== "loading" && !userId) {
      redirect("/login");
    }
  }, [session.status, userId]);

  // Always call hooks in the same order, regardless of conditions
  const user = useQuery(api.user.getUserIndb, {
    email: userId?.email ?? undefined,
  });
  const data: ProductType[] | undefined = useQuery(api.product.getProduct, {
    userId: user?._id,
  });

  const filteredData = useMemo(() => {
    if (!searchValue) return data;
    return data?.filter((item) =>
      item.igicuruzwa.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, data]);
  console.log(data);
  return (
    <section className="w-full mt-2 space-y-4 px-2">
      <HeaderSection title="Ibicuruzwa biri muri Stock" />

      {data?.length === 0 ? (
        <EmptyPlaceholder
          label="Rangura"
          link="/rangura"
          title="Stock ntakintu kirimo "
        />
      ) : (
        <>
          <div className="flex items-center justify-between w-full">
            <p className="text-blue-400 text-nowrap hidden lg:flex">
              Byose hamwe: {data?.length}
            </p>
            <div className="lg:w-[600px] w-full">
              <SearchBox
                searchValue={searchValue}
                setSearchValue={setSearchValue}
              />
            </div>
          </div>
          <DataTable columns={columns} data={filteredData || []} />
        </>
      )}
    </section>
  );
};

export default StockPage;
