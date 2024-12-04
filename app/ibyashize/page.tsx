"use client";
import HeaderSection from "@/components/HeaderSection";
import { columns } from "@/components/ibyashize/columns";
import { DataTable } from "@/components/ibyashize/DataTable";
import { api } from "@/convex/_generated/api";
import { outOfStock } from "@/types";
import { useQuery } from "convex/react";
import React from "react";

const IbyashizePage = () => {
  const outOfStock: outOfStock[] | undefined = useQuery(
    api.product.getProductOutOfStock
  );
  return (
    <section className="w-full mt-2">
      <HeaderSection title="Ibyashize muri Stock" />

      <DataTable columns={columns} data={outOfStock || []} />
    </section>
  );
};

export default IbyashizePage;
