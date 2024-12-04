"use client";

import HeaderSection from "@/components/HeaderSection";
import { columns } from "@/components/ibyaranguwe/columns";
import { DataTable } from "@/components/ibyaranguwe/DataTable";
import { api } from "@/convex/_generated/api";
import { PurchaseType } from "@/types";
import { useQuery } from "convex/react";
import React from "react";

const StockPage = () => {
  const data: PurchaseType[] | undefined = useQuery(api.product.getProduct);
  return (
    <section className="w-full mt-2">
      <HeaderSection title="Ibicuruzwa biri muri Stock" />

      <DataTable columns={columns} data={data || []} />
    </section>
  );
};

export default StockPage;
